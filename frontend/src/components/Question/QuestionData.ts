export const QuestionData = [
  {
    id: 1,
    question:
      "What is the purpose of this chat application?",
    answer:
      "This chat application is designed to improve communication between developers working on the Trello platform. It aims to enhance software quality and evolution by providing a real-time messaging system that allows developers to collaborate effectively.",
  },
  {
    id: 2,
    question: "How does the chat application work?",
    answer:
      "The chat application is built using React and WebSocket.io. It integrates with the Trello platform to retrieve relevant data, such as tasks and assignments. Developers can join different chat groups and subgroups, including sprint conversations and general conversations. They can send and receive messages, view chat history, and receive real-time updates.",
  },
  {
    id: 3,
    question: "What is the advantage of using WebSocket.io for communication?",
    answer:
      "WebSocket.io is used for real-time communication between developers. It allows for bi-directional communication, enabling instant messaging and updates without the need for constant server polling. This ensures a faster and more efficient chat experience..",
  },
  {
    id: 4,
    question: "Where are the chat messages stored for long-term retrieval?",
    answer:
      "The chat messages can be stored using a long-term storage solution such as Firebase or MongoDB. These databases provide the ability to store and retrieve messages for future reference.",
  },
  {
    id: 5,
    question: "How are developer teams and subgroups managed in the chat application?",
    answer:
      "Developer teams and subgroups can be created within the chat application. Developers can be assigned to specific teams or subgroups, allowing them to communicate with their respective team members. Messages are segregated and displayed within the appropriate teams and subgroups.",
  },
  {
    id: 6,
    question: "Can I switch between different conversation types?",
    answer:
      "Yes, the chat application provides the flexibility to switch between different conversation types. You can choose between sprint conversations, which are specifically related to ongoing sprints or tasks, and general conversations, which are more open and not tied to specific tasks.",
  },
  {
    id: 7,
    question: "Is the chat application secure?",
    answer:
      "Yes, the chat application should prioritize security. It should include measures such as encrypted communication using SSL/TLS protocols, user authentication, and authorization to ensure that only authorized users can access and participate in the chat.",
  },
];
