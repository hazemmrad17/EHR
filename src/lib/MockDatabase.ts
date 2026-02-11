"use client";

// Mock Database for EHR+ SaaS Platform
// Stores patient records, visits, and analytics state

export interface Patient {
    id: string;
    name: string;
    dob: string;
    age: number;
    gender: string;
    bloodType: string;
    condition: string;
    riskScore: number;
    progression: number;
    avatar: string;
    lastVisit: string;
    status: 'active' | 'discharged' | 'critical';
}

export const mockDatabase = {
    patients: [
        {
            id: "P001",
            name: "Gregor Golden",
            dob: "1985-06-12",
            age: 39,
            gender: "Male",
            bloodType: "O+",
            condition: "Glioblastoma Multiforme",
            riskScore: 84,
            progression: 12,
            avatar: "Gregor",
            lastVisit: "Feb 11, 2024",
            status: 'critical' as const,
        },
        {
            id: "P002",
            name: "Emma Watson",
            dob: "1992-03-22",
            age: 32,
            gender: "Female",
            bloodType: "A-",
            condition: "Temporal Lobe Epilepsy",
            riskScore: 32,
            progression: 5,
            avatar: "Emma",
            lastVisit: "Feb 10, 2024",
            status: 'active' as const,
        },
        {
            id: "P003",
            name: "Marcus Rivera",
            dob: "1978-11-05",
            age: 45,
            gender: "Male",
            bloodType: "B+",
            condition: "Parkinson's Disease",
            riskScore: 58,
            progression: 8,
            avatar: "Marcus",
            lastVisit: "Feb 09, 2024",
            status: 'active' as const,
        },
        {
            id: "P004",
            name: "Aisha Patel",
            dob: "1995-08-14",
            age: 28,
            gender: "Female",
            bloodType: "AB+",
            condition: "Multiple Sclerosis",
            riskScore: 41,
            progression: 3,
            avatar: "Aisha",
            lastVisit: "Feb 08, 2024",
            status: 'active' as const,
        },
        {
            id: "P005",
            name: "Thomas Chen",
            dob: "1960-02-28",
            age: 64,
            gender: "Male",
            bloodType: "O-",
            condition: "Alzheimer's Disease",
            riskScore: 72,
            progression: 15,
            avatar: "Thomas",
            lastVisit: "Feb 07, 2024",
            status: 'critical' as const,
        },
        {
            id: "P006",
            name: "Sofia Andersson",
            dob: "1988-07-19",
            age: 35,
            gender: "Female",
            bloodType: "A+",
            condition: "Migraine with Aura",
            riskScore: 18,
            progression: 2,
            avatar: "Sofia",
            lastVisit: "Feb 05, 2024",
            status: 'discharged' as const,
        },
        {
            id: "P007",
            name: "James Okafor",
            dob: "1972-12-03",
            age: 51,
            gender: "Male",
            bloodType: "B-",
            condition: "Meningioma",
            riskScore: 66,
            progression: 9,
            avatar: "James",
            lastVisit: "Feb 04, 2024",
            status: 'active' as const,
        },
        {
            id: "P008",
            name: "Lena Müller",
            dob: "2001-04-10",
            age: 22,
            gender: "Female",
            bloodType: "AB-",
            condition: "Post-concussion Syndrome",
            riskScore: 25,
            progression: 1,
            avatar: "Lena",
            lastVisit: "Feb 03, 2024",
            status: 'discharged' as const,
        },
    ],

    currentVisit: {
        id: "V102",
        patientId: "P001",
        doctor: "Dr. James Carter",
        startTime: "2024-02-11T09:30:00Z",
        status: "In Progress",
        complaint: "Persistent severe headaches & visual aura",
        observations: "Slight motor coordination delay in left hand. Visual field testing reveals minor peripheral loss.",
        assessment: "Potential secondary compression near the primary tumor site.",
        plan: "Schedule emergency MRI (Contrast) and check intracranial pressure."
    },

    analytics: {
        wbc: [
            { date: "Feb 01", value: 8.5 },
            { date: "Feb 05", value: 9.2 },
            { date: "Feb 08", value: 10.1 },
            { date: "Feb 10", value: 11.5 }
        ]
    }
};

export type UserRole = 'doctor' | 'patient' | 'admin';

export const roles = [
    { id: 'doctor', name: 'Dr. James Carter', role: 'Chief Resident' },
    { id: 'patient', name: 'Gregor Golden', role: 'Patient' },
    { id: 'admin', name: 'System Admin', role: 'Administrator' }
];
