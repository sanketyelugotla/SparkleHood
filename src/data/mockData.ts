import { Incident } from "../types/incident";

export const mockIncidents: Incident[] = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "The recommendation system for job listings was found to favor male candidates over equally qualified female candidates due to biased training data, resulting in unequal visibility and missed opportunities.",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z"
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "A large language model provided incorrect safety procedure instructions for handling hazardous chemicals during a query by a lab technician, posing a significant health and safety risk.",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z"
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "An AI-powered support chatbot inadvertently revealed metadata including internal tags and user segmentation data, though no personally identifiable information (PII) was leaked.",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z"
    },
    {
        id: 4,
        title: "Voice Assistant Misinterpreted Emergency Command",
        description: "A voice assistant failed to recognize a user's urgent command to call emergency services, mistaking it for a query about emergency contacts, leading to critical delays.",
        severity: "High",
        reported_at: "2025-04-05T08:45:00Z"
    },
    {
        id: 5,
        title: "Model Generated Inappropriate Content for Minors",
        description: "Due to a lapse in age filtering, a generative AI model produced content with violent themes during a session with a user flagged as under 13, violating child safety protocols.",
        severity: "High",
        reported_at: "2025-03-27T12:20:00Z"
    },
    {
        id: 6,
        title: "AI Misclassified Medical Image",
        description: "An AI system used for cancer detection in radiology scans missed a malignant tumor, issuing a false negative report that led to a three-week delay in treatment.",
        severity: "High",
        reported_at: "2025-03-10T11:00:00Z"
    },
    {
        id: 7,
        title: "Autonomous Drone Entered Restricted Airspace",
        description: "Navigation AI failed to identify no-fly zones due to outdated geofencing data, causing an autonomous drone to breach restricted military airspace during a test flight.",
        severity: "Medium",
        reported_at: "2025-04-09T13:10:00Z"
    },
    {
        id: 8,
        title: "Sentiment Analysis Tool Flagged Neutral Text",
        description: "A sentiment analysis tool incorrectly flagged product reviews with neutral language as negative, resulting in the wrongful removal of valid customer feedback.",
        severity: "Low",
        reported_at: "2025-03-22T16:30:00Z"
    },
    {
        id: 9,
        title: "Chatbot Revealed Internal Training Data",
        description: "A support chatbot disclosed fragments of internal documentation and training examples during interactions, revealing proprietary information to the public.",
        severity: "Medium",
        reported_at: "2025-04-11T10:25:00Z"
    },
    {
        id: 10,
        title: "Autonomous Vehicle Ignored Stop Sign",
        description: "Due to poor visibility caused by fog, an autonomous vehicle’s vision system failed to detect a stop sign, leading to a minor collision at an intersection.",
        severity: "High",
        reported_at: "2025-03-30T07:55:00Z"
    },
    {
        id: 11,
        title: "Face Recognition Misidentified Employee",
        description: "A face recognition system used for office entry denied access to a legitimate employee and flagged the incident as a potential security threat, causing confusion and delay.",
        severity: "Medium",
        reported_at: "2025-04-02T09:40:00Z"
    },
    {
        id: 12,
        title: "LLM Generated Biased Resume Suggestions",
        description: "A resume helper powered by an LLM produced biased recommendations that prioritized resumes with Western-sounding names, reflecting underlying training data prejudice.",
        severity: "Medium",
        reported_at: "2025-03-25T11:50:00Z"
    },
    {
        id: 13,
        title: "Virtual Assistant Scheduled Wrong Medication Time",
        description: "A healthcare-focused virtual assistant misinterpreted natural language input and scheduled medication reminders 6 hours late, risking patient health in time-sensitive cases.",
        severity: "High",
        reported_at: "2025-04-04T18:00:00Z"
    },
    {
        id: 14,
        title: "AI-Powered Moderation Blocked Educational Content",
        description: "An AI moderation tool incorrectly flagged and removed a YouTube video on reproductive health education, restricting access to vital information.",
        severity: "Low",
        reported_at: "2025-03-17T14:10:00Z"
    },
    {
        id: 15,
        title: "Translation Model Introduced Critical Errors",
        description: "An AI-powered translation system changed legal meanings in an international contract, nearly resulting in a contractual dispute.",
        severity: "High",
        reported_at: "2025-04-07T20:30:00Z"
    },
    {
        id: 16,
        title: "Financial Bot Gave Illegal Investment Advice",
        description: "A personal finance chatbot suggested tax avoidance strategies that were non-compliant with federal law due to training data gaps.",
        severity: "High",
        reported_at: "2025-03-12T08:20:00Z"
    },
    {
        id: 17,
        title: "Generative AI Created Defamatory Article",
        description: "A generative news bot mistakenly created an article accusing an innocent person of fraud due to misinterpreted data.",
        severity: "High",
        reported_at: "2025-03-31T13:45:00Z"
    },
    {
        id: 18,
        title: "Driver Monitoring AI Ignored Drowsiness",
        description: "A fatigue detection system failed to alert a driver exhibiting microsleep behavior, resulting in a near-accident on the highway.",
        severity: "Medium",
        reported_at: "2025-04-10T07:30:00Z"
    },
    {
        id: 19,
        title: "Training Data Breach During Fine-tuning",
        description: "Sensitive user conversations used during model fine-tuning were accidentally exposed in a public GitHub repository.",
        severity: "High",
        reported_at: "2025-04-12T15:15:00Z"
    },
    {
        id: 20,
        title: "Content Generator Included Copyrighted Text",
        description: "A generative AI system reused copyrighted paragraphs verbatim from a news article, causing a DMCA takedown notice.",
        severity: "Medium",
        reported_at: "2025-04-06T19:00:00Z"
    }
];
