import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  volunteer,
  dexian,
  community,
  aidetection,
  oncology,
  diabetes,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "AI Intern",
    icon: web,
  },
  {
    title: "Python Developer",
    icon: mobile,
  },
  {
    title: "Data Scientist",
    icon: backend,
  },
  {
    title: "Web Developer",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "AI Python Developer Intern",
    companyName: "Dexian",
    icon: dexian,
    iconBg: "#E6DEDD",
    date: "Oct 2025 - Present",
    points: [
      "Building a Python + Flask platform with REST APIs, MySQL data workflows, and secure authentication.",
      "Developing NLP / Chatbot features for automated assistance and smart user interactions using AI/ML models.",
      "Supporting testing, debugging, deployment, and Agile-based development with Git.",
    ],
  },
  {
    title: "Volunteer",
    companyName: "Anbagam Old Age Home",
    icon: volunteer,
    iconBg: "#E6DEDD",
    date: "Jun 2024 - Jul 2025",
    points: [
      "Provided companionship and facilitated group activities for seniors, supporting emotional well-being for 10 residents per session.",
      "Assisted in daily operations including meal distribution for 40+ residents.",
    ],
  },
  {
    title: "Community Connect - Pivotal Role",
    companyName: "Community Education and Development",
    icon: community,
    iconBg: "#383E56",
    date: "Jun 2024 - Jul 2025",
    points: [
      "Led community education workshops on health awareness, digital literacy, and personal hygiene, reaching 200+ participants.",
      "Designed outreach programs with local NGOs and schools, increasing literacy engagement by 35%.",
    ],
  },
];

const projects: TProject[] = [
  {
    name: "AI-Generated Image Detection",
    description:
      "Developed a deep learning system using CNN and Vision Transformers to classify and detect synthetic images. Achieved high accuracy in distinguishing AI-generated content from real photographs.",
    tags: [
      {
        name: "tensorflow",
        color: "blue-text-gradient",
      },
      {
        name: "cnn",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: aidetection,
    sourceCodeLink: "https://github.com/MuthuxSelvam",
  },
  {
    name: "Oncology Prediction Model",
    description:
      "Leveraged SVM and Reinforcement Learning to predict cancer outcomes. Built a robust model for early detection and diagnosis, contributing to improved patient care and treatment planning.",
    tags: [
      {
        name: "svm",
        color: "blue-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "green-text-gradient",
      },
      {
        name: "ml",
        color: "pink-text-gradient",
      },
    ],
    image: oncology,
    sourceCodeLink: "https://github.com/MuthuxSelvam",
  },
  {
    name: "Diabetes Prediction System",
    description:
      "Deployed a machine learning-driven diagnostic tool using Python (scikit-learn) and patient data. Trained on 1000+ patient records with key indicators like BMI, age, and glucose levels.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "green-text-gradient",
      },
      {
        name: "healthcare",
        color: "pink-text-gradient",
      },
    ],
    image: diabetes,
    sourceCodeLink: "https://github.com/MuthuxSelvam",
  },
];

export { services, technologies, experiences, projects };
