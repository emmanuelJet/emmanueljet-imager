export interface IMeConfig {
  url: string;
  email: string;
  gender: string;
  country: string;
  socials: {
    linkedin: string;
    github: string;
    x: string;
  },
  name: {
    full: string;
    last: string;
    first: string;
    middle: string;
    nickname: string;
    brand: string;
  };
};

const meConfig: IMeConfig = {
  gender: 'Male',
  country: 'Nigeria',
  url: 'https://emmanueljet.com',
  email: 'hello@emmanueljet.com',
  socials: {
    linkedin: 'https://linkedin.com/in/emmanuelJet',
    github: 'https://github.com/emmanuelJet',
    x: 'https://x.com/emmanuelJet_',
  },
  name: {
    full: 'Emmanuel Joseph (JET)',
    brand: 'emmanueljet',
    middle: 'Temitayo',
    first: 'Emmanuel',
    nickname: 'JET',
    last: 'Joseph',
  },
};

export default meConfig;