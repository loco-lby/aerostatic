"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { config } from '@/config';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumbs({ items, showHome = true }: BreadcrumbsProps) {
  const breadcrumbItems = showHome
    ? [{ name: 'Home', url: config.baseUrl }, ...items]
    : items;

  const schema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-white/60">
          {showHome && (
            <>
              <li>
                <Link
                  href="/"
                  className="hover:text-orange-400 transition-colors flex items-center"
                >
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              {items.length > 0 && (
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
              )}
            </>
          )}
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center space-x-2">
              {index === items.length - 1 ? (
                <span className="text-white font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.url}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
