"use client";

import { useEffect, useState } from "react";
import { WilayahScreen } from "../components/WilayahScreen";
import { WilayahSelector } from "../components/WilayahSelector";
import { kabupatenColumns } from "../table/kabupatenColumns";

export default function KabupatenPage() {
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [showProvinceModal, setShowProvinceModal] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pgri-wilayah-selection');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const selectedRegion = parsed.selectedParentRegion || {};

          // Convert the stored format back to selections format
          const selections = {
            province: selectedRegion.provinceCode ? {
              id: selectedRegion.provinceCode,
              name: selectedRegion.provinceName
            } : undefined,
          };

          setSelectedParent(selections);

          // Show modal if no province is selected
          if (!selectedRegion.provinceCode) {
            setShowProvinceModal(true);
          }
        } catch (error) {
          console.error('Error parsing localStorage:', error);
          setShowProvinceModal(true);
        }
      } else {
        setShowProvinceModal(true);
      }
    }
  }, []);

  const handleWilayahSelectorSuccess = (selections: any) => {
    setSelectedParent(selections);
    setShowProvinceModal(false);
  };

  // Only show WilayahScreen if a province is selected
  const canShowData = selectedParent?.province?.id;

  if (!canShowData) {
    return (
      <>
        <WilayahSelector
          isOpen={showProvinceModal}
          onClose={() => setShowProvinceModal(false)}
          title="Pilih Wilayah Induk"
          description="Silakan pilih provinsi untuk melihat data Kabupaten/Kota"
          maxLevel="provinces"
          onSuccess={handleWilayahSelectorSuccess}
        />
        {showProvinceModal && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Memilih Provinsi</h2>
              <p className="text-muted-foreground">Silakan pilih provinsi untuk melihat data Kabupaten/Kota</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <WilayahScreen
        type="cities"
        wilayahLabel="Kabupaten/Kota"
        parentCode={selectedParent.province.id}
        columns={kabupatenColumns}
        pageSize={10}
        AddAndFilterProps={{
          currentLevel: "kabupaten",
          onShowParentModal: () => setShowProvinceModal(true),
        }}
      />

      <WilayahSelector
        isOpen={showProvinceModal}
        onClose={() => setShowProvinceModal(false)}
        title="Pilih Wilayah Induk"
        description="Silakan pilih provinsi untuk melihat data Kabupaten/Kota"
        maxLevel="provinces"
        onSuccess={handleWilayahSelectorSuccess}
      />
    </div>
  );
}
