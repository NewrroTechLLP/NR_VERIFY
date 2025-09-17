// src/app/api/verify/route.ts

import { NextResponse } from 'next/server';

// Our Mock Database remains the same
const mockDatabase = [
  {
    id: 'NR23DR001',
    fullName: 'HM Basavaraj',
    designation: 'Founder/Director',
    department: 'Programming',
    status: 'Active',
    startDate: '01/01/2024',
  },
  {
    id: 'NR23DR002',
    fullName: 'Nikhil U',
    designation: 'Founder/CEO',
    department: 'CAED/3D Designing',
    status: 'Active',
    startDate: '01/01/2024',
  },
  {
    id: 'NR23DR003',
    fullName: 'BinduSagar M G',
    designation: 'Founder/COO',
    department: 'Electronics',
    status: 'Active',
    startDate: '01/01/2024',
  },
  {
    id: 'NR25EM001',
    fullName: 'Soumya',
    designation: 'Acounts Head',
    department: 'Acounts and Finance',
    status: 'Active',
    startDate: '01/01/2024',
  },
  {
    id: 'NR25EM002',
    fullName: 'Samartha S',
    designation: 'Robotic Software Lead',
    department: 'Programming',
    status: 'Active',
    startDate: '06/01/2025',
  },
  {
    id: 'NR25EM003',
    fullName: 'Pruthvi D',
    designation: 'Stores Head',
    department: 'Programming',
    status: 'Active',
    startDate: '06/01/2025',
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // <-- 1. GET both employeeId and fullName from the request
    const { employeeId, fullName } = body;

    // <-- 2. VALIDATE that both fields are present
    if (!employeeId || !fullName) {
      return NextResponse.json(
        { message: 'Employee ID and Full Name are required' },
        { status: 400 }
      );
    }

    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // <-- 3. UPDATE the search logic to check both fields
    // We use .toLowerCase() to make the name check case-insensitive
    const employee = mockDatabase.find(
      (emp) =>
        emp.id.toLowerCase() === employeeId.toLowerCase() &&
        emp.fullName.toLowerCase() === fullName.toLowerCase()
    );

    if (employee) {
      // Return the employee data if a match is found
      return NextResponse.json(employee);
    } else {
      // Return a more specific error if no match is found
      return NextResponse.json(
        { message: 'Verification Failed: The ID and Name do not match any record.' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}