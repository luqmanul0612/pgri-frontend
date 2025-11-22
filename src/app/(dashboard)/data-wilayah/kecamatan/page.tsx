"use client";

import { useEffect, useState } from "react";
import { WilayahScreen } from "../components/WilayahScreen";
import { WilayahSelector } from "../components/WilayahSelector";
import { kecamatanColumns } from "../table/kecamatanColumns";

export default function KecamatanPage() {
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [showWilayahModal, setShowWilayahModal] = useState(false);

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
            city: selectedRegion.cityCode ? {
              id: selectedRegion.cityCode,
              name: selectedRegion.cityName
            } : undefined,
          };

          setSelectedParent(selections);

          // Show modal if no required parent regions are selected
          if (!selectedRegion.provinceCode || !selectedRegion.cityCode) {
            setShowWilayahModal(true);
          }
        } catch (error) {
          console.error('Error parsing localStorage:', error);
          setShowWilayahModal(true);
        }
      } else {
        setShowWilayahModal(true);
      }
    }
  }, []);

  const handleWilayahSelectorSuccess = (selections: any) => {
    setSelectedParent(selections);
    setShowWilayahModal(false);
  };

  // Only show WilayahScreen if all required parents are selected
  const canShowData = selectedParent?.province?.id && selectedParent?.city?.id;

  if (!canShowData) {
    return (
      <>
        <WilayahSelector
          isOpen={showWilayahModal}
          onClose={() => setShowWilayahModal(false)}
          title="Pilih Wilayah Induk"
          description="Silakan pilih provinsi dan kabupaten/kota untuk melihat data kecamatan"
          maxLevel="districts"
          onSuccess={handleWilayahSelectorSuccess}
        />
        {showWilayahModal && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Memilih Wilayah</h2>
              <p className="text-muted-foreground">Silakan pilih provinsi dan kabupaten/kota untuk melihat data kecamatan</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <WilayahScreen
        type="districts"
        wilayahLabel="Kecamatan"
        parentCode={selectedParent.city.id}
        columns={kecamatanColumns}
        pageSize={10}
        AddAndFilterProps={{
          currentLevel: "kecamatan",
          onShowParentModal: () => setShowWilayahModal(true),
        }}
      />

      <WilayahSelector
        isOpen={showWilayahModal}
        onClose={() => setShowWilayahModal(false)}
        title="Pilih Wilayah Induk"
        description="Silakan pilih provinsi dan kabupaten/kota untuk melihat data kecamatan"
        maxLevel="cities"  // Only show up to cities for kecamatan page
        onSuccess={handleWilayahSelectorSuccess}
      />
    </div>
  );
}
