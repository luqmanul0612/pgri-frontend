"use client";

import { useEffect, useState } from "react";
import { WilayahScreen } from "../components/WilayahScreen";
import { WilayahSelector } from "../components/WilayahSelector";
import { kelurahanColumns } from "../table/kelurahanColumns";

export default function KelurahanPage() {
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
            district: selectedRegion.districtCode ? {
              id: selectedRegion.districtCode,
              name: selectedRegion.districtName
            } : undefined,
          };

          setSelectedParent(selections);

          // Show modal if no required parent regions are selected
          if (!selectedRegion.provinceCode || !selectedRegion.cityCode || !selectedRegion.districtCode) {
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
  const canShowData = selectedParent?.province?.id && selectedParent?.city?.id && selectedParent?.district?.id;

  if (!canShowData) {
    return (
      <>
        <WilayahSelector
          isOpen={showWilayahModal}
          onClose={() => setShowWilayahModal(false)}
          title="Pilih Wilayah Induk"
          description="Silakan pilih provinsi, kabupaten/kota, dan kecamatan untuk melihat data desa/kelurahan"
          maxLevel="subdistricts"
          onSuccess={handleWilayahSelectorSuccess}
        />
        {showWilayahModal && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">Memilih Wilayah</h2>
              <p className="text-muted-foreground">Silakan pilih provinsi, kabupaten/kota, dan kecamatan untuk melihat data desa/kelurahan</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <WilayahScreen
        type="subdistricts"
        wilayahLabel="Desa/Kelurahan"
        parentCode={selectedParent.district.id}
        columns={kelurahanColumns}
        pageSize={10}
        AddAndFilterProps={{
          currentLevel: "kelurahan",
          onShowParentModal: () => setShowWilayahModal(true),
        }}
      />

      <WilayahSelector
        isOpen={showWilayahModal}
        onClose={() => setShowWilayahModal(false)}
        title="Pilih Wilayah Induk"
        description="Silakan pilih provinsi, kabupaten/kota, dan kecamatan untuk melihat data desa/kelurahan"
        maxLevel="districts"  // Only show up to districts for kelurahan page
        onSuccess={handleWilayahSelectorSuccess}
      />
    </div>
  );
}
