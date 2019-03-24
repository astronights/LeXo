export const steps = [
    {
        id: "0",
        message: "Welcome to the Carpe Diem chatbot!",
        trigger: "1"
    },
    {
        id: "1",
        message: "What's your name?",
        trigger: "name"
    },
    {
        id: "name",
        user: true,
        trigger: 3,

    },
    {
        id: "3",
        message: "Hey, {previousValue}!",
        trigger: "4"
    },
    {
        id: "4",
        message: "I have a few questions to help personalise this app for you.",
        trigger: "5"
    },
    {
        id: "5",
        message: "What's your Home Address?",
        trigger: "home"
    },
    {
        id: "home",
        user: true,
        trigger: "8"
    },
    {
        id: "8",
        message: "Is your Travel subsidized?",
        trigger: "9"
    },
    {
        id: "9",
        options: [
            {value: "Senior citizen card fare", label: "Senior citizen", trigger: "10"},
            {value: "Student card fare", label: "Student", trigger: "10"},
            {value: "Workplace transport concession card fare", label: "Workplace concession", trigger: "10"},
            {value: "Person with disabilities card fare", label: "Disabilities", trigger: "10"},
            {value: "Adult card fare", label: "None", trigger: "10"}
        ],
    },
    {
        id: "10",
        message: "Good to know!",
        trigger: "11"
    },
    {
        id: "11",
        message: "Would you rather?",
        trigger: "12"
    },
    {
        id: "12",
        options: [
            {value: "netflix", label: "Netflix", trigger: "13"},
            {value: "youtube", label: "Youtube", trigger: "13"},
            {value: "spotify", label: "Spotify", trigger: "13"}
        ]
    },
    {
        id: "13",
        message: "Thanks for the info!",
        trigger: "14"
    },
    {
        id: "14",
        message: "Sieze the day, meam amice!",
        end: true
    }

];