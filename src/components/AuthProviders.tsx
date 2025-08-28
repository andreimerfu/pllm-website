import React from 'react';
import { Icon } from '@iconify/react';

interface Provider {
  name: string;
  icon: string;
  description: string;
  category: 'social' | 'enterprise' | 'cloud';
  isLocal?: boolean;
}

const providers: Provider[] = [
  // Social/Popular
  { name: 'Google', icon: 'logos:google-icon', description: 'Google Workspace & Gmail', category: 'social' },
  { name: 'Microsoft', icon: 'logos:microsoft-icon', description: 'Azure AD & Office 365', category: 'social' },
  { name: 'GitHub', icon: 'logos:github-icon', description: 'GitHub Organizations', category: 'social' },
  
  // Enterprise
  { name: 'Active Directory', icon: '/azure-active-directory.png', description: 'Windows Active Directory', category: 'enterprise', isLocal: true },
  { name: 'LDAP', icon: '/ldap.png', description: 'LDAP Directory Services', category: 'enterprise', isLocal: true },
  { name: 'SAML', icon: '/saml.svg', description: 'SAML 2.0 Identity Providers', category: 'enterprise', isLocal: true },
  
  // Cloud
  { name: 'AWS', icon: 'logos:aws', description: 'AWS IAM & Cognito', category: 'cloud' },
  { name: 'Okta', icon: 'logos:okta-icon', description: 'Okta Identity Cloud', category: 'cloud' },
  { name: 'Auth0', icon: 'logos:auth0-icon', description: 'Auth0 Identity Platform', category: 'cloud' },
];

const AuthProviders: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Provider grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <div 
            key={provider.name}
            className="group bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl p-4 transition-all duration-200 cursor-pointer border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex items-center justify-center">
                {provider.isLocal ? (
                  <img 
                    src={provider.icon} 
                    alt={provider.name}
                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <Icon 
                    icon={provider.icon} 
                    className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                  />
                )}
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1 transition-colors duration-200">
                {provider.name}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 transition-colors duration-200">
                {provider.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 transition-colors duration-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">9+</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 transition-colors duration-200">Providers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">SSO</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 transition-colors duration-200">Ready</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">Free</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 transition-colors duration-200">Included</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthProviders;