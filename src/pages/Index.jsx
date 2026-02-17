import React from 'react'
import TripForm from '../components/TripForm';
import Layout from '../components/Layout';

export default function index() {
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg card-shadow rounded-2xl border border-border bg-card p-8">
          <TripForm />
        </div>
      </div>
    </Layout>
  );
}
