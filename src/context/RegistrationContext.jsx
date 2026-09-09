import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultOpeningHours = [
  { day: 'Monday',    open: true, from: '09:00', to: '18:00' },
  { day: 'Tuesday',   open: true, from: '09:00', to: '18:00' },
  { day: 'Wednesday', open: true, from: '09:00', to: '18:00' },
  { day: 'Thursday',  open: true, from: '09:00', to: '18:00' },
  { day: 'Friday',    open: true, from: '09:00', to: '18:00' },
  { day: 'Saturday',  open: true, from: '09:00', to: '18:00' },
  { day: 'Sunday',    open: false, from: '09:00', to: '18:00' },
];

const emptyState = {
  name: '',
  slug: '',
  category: '',
  categoryName: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  city: '',
  location: '',
  description: '',
  website: '',
  referralCode: '',
  selectedPlan: 'standard',
  planPrice: '₹499/yr',
  bannerImage: null,       // File object or preview URL
  galleryImages: [],       // Array of File objects or preview URLs
  openingHours: defaultOpeningHours,
};

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      return { ...emptyState, ...JSON.parse(localStorage.getItem('nexora-registration') || '{}') };
    } catch {
      return emptyState;
    }
  });
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexora-registration', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetForm = () => {
    setFormData(emptyState);
    setRegistrationCompleted(false);
    localStorage.removeItem('nexora-registration');
  };

  return (
    <RegistrationContext.Provider
      value={{ formData, updateFormData, resetForm, registrationCompleted, setRegistrationCompleted }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
