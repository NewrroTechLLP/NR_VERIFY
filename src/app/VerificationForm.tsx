'use client';

import { useState, FormEvent, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import formStyles from './page.module.css';
import resultStyles from './Verification.module.css';
import { VerificationSeal } from './VerificationSeal';

// Type definition for the data received from the API
type EmployeeData = {
  fullName: string;
  designation: string;
  department: string;
  status: string;
  startDate: string;
};

export default function VerificationForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmployeeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State to track if the component has mounted on the client
  const [isClient, setIsClient] = useState(false);

  // useEffect to set isClient to true after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, fullName }),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(data);
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={formStyles.verificationBox}>
        <form onSubmit={handleSubmit} className={formStyles.form}>
          {/* Employee ID Input */}
          <label htmlFor="employeeId" className={formStyles.label}>
            Employee or Intern ID
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className={formStyles.input}
            placeholder="e.g., NRXXAAXXX"
            required
          />

          {/* Full Name Input */}
          <label htmlFor="fullName" className={formStyles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={formStyles.input}
            placeholder="e.g., Arjun Sharma"
            required
          />

          <button type="submit" className={formStyles.button} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>

      {/* Conditionally render animated components only on the client */}
      {isClient && (
        <>
          <AnimatePresence>
            {error && (
              <div className={resultStyles.resultsBox}>
                <VerificationSeal status="fraud" />
                <p className={resultStyles.errorMessage}>{error}</p>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <div className={resultStyles.resultsBox}>
                <VerificationSeal status="verified" />
                <h2 className={resultStyles.resultsHeader}>Verification Successful</h2>
                <div className={resultStyles.resultItem}>
                  <strong>Full Name:</strong> <span>{result.fullName}</span>
                </div>
                <div className={resultStyles.resultItem}>
                  <strong>Designation:</strong> <span>{result.designation}</span>
                </div>
                <div className={resultStyles.resultItem}>
                  <strong>Department:</strong> <span>{result.department}</span>
                </div>
                <div className={resultStyles.resultItem}>
                  <strong>Status:</strong> <span>{result.status}</span>
                </div>
                <div className={resultStyles.resultItem}>
                  <strong>Start Date:</strong> <span>{result.startDate}</span>
                </div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}