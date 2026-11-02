'use client';

import React from 'react';
import { useCartBooking } from '@/context/CartBookingContext';

export default function Toast() {
  const { toastMessage } = useCartBooking();

  return (
    <div
      className={`toast ${toastMessage ? 'is-show' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {toastMessage || ''}
    </div>
  );
}
