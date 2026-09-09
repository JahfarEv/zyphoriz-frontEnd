import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFound = () => {
  return (
    <main className="w-full px-margin-mobile py-20 text-center">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-10 shadow-sm space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="font-headline text-3xl font-bold text-on-surface">Page Not Found</h1>
        <p className="font-sans text-sm text-on-surface-variant">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
