export interface Education {
  qualification: string;
  institution: string;
  startDate: string;            // 'YYYY' or 'YYYY-MM-DD'
  endDate: string;              // 'YYYY', date, or 'Present'
  location?: string;
  icon?: string;                // e.g. 'fa-solid fa-graduation-cap'
  type: 'education' | 'certification';
  description?: string;
  credentialUrl?: string;
}
