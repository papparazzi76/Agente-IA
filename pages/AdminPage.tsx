import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth, UserProfile } from '../contexts/AuthContext';
import { supabase } from '../supabase';

const ADMIN_EMAIL = 'admin@agenteia.com';

const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const displayMessage = (type: 'success' | 'error', text: string) => {
      setMessage({ type, text });
      setTimeout(() => setMessage(null), 4000);
  };

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-all-users');
      if (error) throw error;
      setUsers(data || []); 
    } catch (e: any) {
      console.error("Failed to load users from function", e);
      displayMessage('error', e.message || t('admin.loadError'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);


  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      const { error } = await supabase.functions.invoke('update-user-profile', {
        body: { userId, updates },
      });
      if (error) throw error;
      
      setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
      displayMessage('success', t('admin.updateSuccess'));
    } catch (e: any) {
        console.error("Failed to update user", e);
        displayMessage('error', e.message || t('admin.updateError'));
    }
  };
  
  const handleToggleBlock = (userId: string, isCurrentlyBlocked?: boolean) => {
      updateUserProfile(userId, { is_blocked: !isCurrentlyBlocked });
  };
  
  const handleGrantLifetime = (userId: string) => {
      updateUserProfile(userId, { has_lifetime_access: true });
  };

  const handleDeleteUser = async (userToDelete: UserProfile) => {
    if (userToDelete.id === currentUser?.id) {
      displayMessage('error', t('admin.cannotDeleteSelf'));
      return;
    }
    if (userToDelete.email === ADMIN_EMAIL) {
       displayMessage('error', t('admin.cannotDeleteAdmin'));
       return;
    }
    if (window.confirm(t('admin.deleteConfirm', { email: userToDelete.email }))) {
        try {
            const { error } = await supabase.functions.invoke('delete-user-by-id', {
                body: { userId: userToDelete.id },
            });
            if (error) throw error;

            setUsers(users.filter(u => u.id !== userToDelete.id));
            displayMessage('success', t('admin.deleteSuccess'));
        } catch(e: any) {
            console.error("Failed to delete user", e);
            displayMessage('error', e.message || t('admin.deleteError'));
        }
    }
  };
  
  const UserStatus: React.FC<{ user: UserProfile }> = ({ user }) => {
    if (user.is_blocked) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-300">{t('admin.statusBlocked')}</span>;
    if (user.has_lifetime_access) return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300">{t('admin.statusLifetime')}</span>;
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300">{t('admin.statusActive')}</span>;
  };

  return (
    <div className="animate-fadeIn">
      <section className="relative py-20 md:py-24 text-pure-white bg-corporate-dark">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight text-glow">{t('header.navAdmin')}</h1>
        </div>
      </section>
      <section className="py-10 md:py-16 bg-corporate-dark">
        <div className="container mx-auto px-6 max-w-6xl">
          {message && (
            <div className={`p-4 mb-6 text-center rounded-lg border ${message.type === 'success' ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-red-500/20 text-red-300 border-red-500/50'}`}>
              {message.text}
            </div>
          )}
          
          <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <h2 className="font-poppins text-2xl font-bold mb-6 text-center">{t('admin.userManagementTitle')}</h2>
             {isLoading ? (
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tech-blue mx-auto"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="border-b-2 border-tech-blue/30">
                        <tr>
                            <th className="p-4 font-semibold text-pure-white">{t('admin.userEmail')}</th>
                            <th className="p-4 font-semibold text-pure-white">{t('admin.userRole')}</th>
                            <th className="p-4 font-semibold text-pure-white">{t('admin.status')}</th>
                            <th className="p-4 font-semibold text-pure-white">{t('admin.actions')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <td className="p-4 text-gray-300">{user.email}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-tech-cyan/20 text-tech-cyan' : 'bg-gray-600 text-gray-200'}`}>
                                {user.role === 'admin' ? t('admin.roleAdmin') : t('admin.roleStudent')}
                                </span>
                            </td>
                            <td className="p-4"><UserStatus user={user} /></td>
                            <td className="p-4">
                                <div className="flex flex-wrap gap-2">
                                {user.role === 'student' && (
                                    <>
                                    <button onClick={() => handleGrantLifetime(user.id)} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded hover:bg-green-500/40">{t('admin.actionGrantLifetime')}</button>
                                    <button onClick={() => handleToggleBlock(user.id, user.is_blocked)} className={`text-xs px-2 py-1 rounded ${user.is_blocked ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40' : 'bg-red-500/20 text-red-300 hover:bg-red-500/40'}`}>{user.is_blocked ? t('admin.actionUnblock') : t('admin.actionBlock')}</button>
                                    <button onClick={() => handleDeleteUser(user)} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded hover:bg-gray-500">{t('admin.deleteUser')}</button>
                                    </>
                                )}
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {users.length === 0 && !isLoading && (
                        <p className="text-center text-gray-400 py-8">{t('admin.noUsers')}</p>
                    )}
                </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;