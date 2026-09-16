/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialVillageProfile, villageProperties } from './data/villageData';
import { VillageProfile, VillageProperty } from './types';
import { VillageHeader } from './components/VillageHeader';
import { VillageMap } from './components/VillageMap';
import { PropertyModal } from './components/PropertyModal';
import { HouseModal } from './components/HouseModal';
import { JournalModal } from './components/JournalModal';
import { GuestbookModal } from './components/GuestbookModal';

export default function App() {
  const [profile, setProfile] = useState<VillageProfile>(initialVillageProfile);
  const [properties, setProperties] = useState<VillageProperty[]>(villageProperties);
  const [selectedProperty, setSelectedProperty] = useState<VillageProperty | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isVisitorLogOpen, setIsVisitorLogOpen] = useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');

  // Fetch initial profile & properties from Express backend
  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.name) setProfile(data);
      })
      .catch(() => {
        // Fallback to initialVillageProfile
      });

    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (data.properties && Array.isArray(data.properties)) {
          setProperties(data.properties);
        }
      })
      .catch(() => {
        // Fallback to villageProperties
      });
  }, []);

  const handleSelectProperty = (property: VillageProperty) => {
    setSelectedProperty(property);
    setIsJournalOpen(false);
  };

  const handleCloseAll = () => {
    setSelectedProperty(null);
    setIsJournalOpen(false);
  };

  return (
    <div id="village-portfolio-app" className="min-h-screen flex flex-col font-sans selection:bg-amber-300 selection:text-stone-900 bg-amber-50/30">
      {/* 1. Header with custom welcome & village motto, plus GitHub, LinkedIn, Get in Touch */}
      <VillageHeader
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        contactEmail={profile.contactEmail}
        githubUrl={profile.github}
        linkedinUrl={profile.linkedin}
        visitorCount={profile.stats.villageVisitors}
        onOpenVisitorLog={() => setIsVisitorLogOpen(true)}
      />

      {/* 2. Village Game Map with roads, houses, and projects */}
      <main className="flex-1 flex flex-col items-center justify-center pb-8 sm:pb-12">
        <VillageMap
          properties={properties}
          selectedProperty={selectedProperty}
          onSelectProperty={handleSelectProperty}
          timeOfDay={timeOfDay}
        />
      </main>

      {/* 3. Modals */}
      {/* 3A. Village Visitor Log / Guestbook */}
      <GuestbookModal
        isOpen={isVisitorLogOpen}
        onClose={() => setIsVisitorLogOpen(false)}
        visitorCount={profile.stats.villageVisitors}
      />

      {/* 3A. My House Modal: Short Bio about Rafi & Terminal Explorer Guide (NO Terminal here) */}
      {selectedProperty && selectedProperty.id === 'my-house' && (
        <HouseModal
          isOpen={true}
          property={selectedProperty}
          profile={profile}
          onClose={handleCloseAll}
        />
      )}

      {/* 3B. Project Terminal Widget (For all other projects) */}
      {selectedProperty && selectedProperty.id !== 'my-house' && !isJournalOpen && (
        <PropertyModal
          property={selectedProperty}
          allProperties={properties}
          onClose={handleCloseAll}
          onNavigate={handleSelectProperty}
          onOpenJournal={() => setIsJournalOpen(true)}
        />
      )}

      {/* 3C. In-Website Engineering Journal / Article Reader (Navigated via 'open readme' without leaving site) */}
      {selectedProperty && selectedProperty.id !== 'my-house' && isJournalOpen && (
        <JournalModal
          property={selectedProperty}
          isOpen={true}
          onClose={handleCloseAll}
          onBackToTerminal={() => setIsJournalOpen(false)}
        />
      )}

      {/* Minimal clean footer */}
      <footer id="village-footer" className="w-full py-4 text-center text-xs font-mono text-stone-500 border-t border-stone-200/60">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>THE LAND OF RAFI // ALL RIGHTS RESERVED</span>
          <span className="text-stone-400 text-[11px]">CLICK ANY BUILDING TO EXPLORE</span>
        </div>
      </footer>
    </div>
  );
}
