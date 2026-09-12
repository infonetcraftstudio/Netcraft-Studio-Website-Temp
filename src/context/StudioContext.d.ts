declare module '@/context/StudioContext' {
  export type Member = {
    id: string | number;
    name: string;
    role: string;
    department?: string;
    bio?: string;
    avatar?: string;
    skills?: string[];
    email?: string;
    [key: string]: any;
  };

  export function StudioProvider(props: any): JSX.Element;

  export function useStudio(): {
    projects: any[];
    members: Member[];
    clients: any[];
    contactInfo: any;
    inquiries: any[];
    services: any[];
    toast: any;
    showToast(message: string, type?: string): void;
    closeToast(): void;
    addProject(data: any): any;
    updateProject(id: any, data: any): void;
    deleteProject(id: any): void;
    toggleProjectFeatured(id: any): void;
    addMember(data: any): any;
    updateMember(id: any, data: any): void;
    deleteMember(id: any): void;
    addClient(data: any): any;
    updateClient(id: any, data: any): void;
    deleteClient(id: any): void;
    updateContactInfo(data: any): void;
    submitInquiry(data: any): any;
    updateInquiryStatus(id: any, status: any): void;
    deleteInquiry(id: any): void;
    isAdminAuthenticated: boolean;
    adminLogin(passcode: string): boolean;
    adminLogout(): void;
    resetToDefaults(): void;
    exportBackup(): void;
    importBackup(jsonString: string): boolean;
  };

  const StudioContext: any;
  export default StudioContext;
}
