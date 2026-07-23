export interface Experience {
    role: string;
    company: string;
    /** Optional end-client when the role is a consultancy placement. */
    client?: string;
    startDate: string;
    endDate: string;
    location: string;
    workType: string;
    icon: string;
    flagSrc: string;
    description: string;
    /** Achievement / responsibility bullets rendered under the summary. */
    highlights?: string[];
    techStack: string[];
  }
  