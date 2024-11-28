import React from 'react';

export const CardsSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 h-32 w-full rounded-lg"></div>
);

export const RevenueChartSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
);

export const LatestInvoicesSkeleton: React.FC = () => (
  <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
);
