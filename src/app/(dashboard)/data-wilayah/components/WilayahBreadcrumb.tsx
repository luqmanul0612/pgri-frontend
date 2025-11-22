"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";
import { WilayahSelector } from "./WilayahSelector";

interface WilayahBreadcrumbProps {
  onShowParentModal: () => void;
  currentLevel: "kabupaten" | "kecamatan" | "kelurahan";
}

interface SelectedParentRegion {
  provinceCode?: string;
  provinceName?: string;
  cityCode?: string;
  cityName?: string;
  districtCode?: string;
  districtName?: string;
}

export const WilayahBreadcrumb: React.FC<WilayahBreadcrumbProps> = ({
  onShowParentModal,
  currentLevel,
}) => {
  const [selectedParent, setSelectedParent] = useState<SelectedParentRegion>({});
  const [showFullModal, setShowFullModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pgri-wilayah-selection');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedParent(parsed.selectedParentRegion || {});
      }
    }
  }, []);

  const getActiveParentText = () => {
    switch (currentLevel) {
      case "kabupaten":
        return selectedParent.provinceName || "Pilih Provinsi";
      case "kecamatan":
        return selectedParent.cityName || selectedParent.provinceName || "Pilih Provinsi";
      case "kelurahan":
        return selectedParent.districtName || selectedParent.cityName || selectedParent.provinceName || "Pilih Provinsi";
      default:
        return "Pilih Provinsi";
    }
  };

  const getFullModalMaxLevel = () => {
    switch (currentLevel) {
      case "kabupaten":
        return "provinces";
      case "kecamatan":
        return "cities";
      case "kelurahan":
        return "districts";
      default:
        return "provinces";
    }
  };

  const handleFullModalSuccess = (selections: any) => {
    // This will update localStorage and trigger a refresh
    window.location.reload();
  };

  return (
    <>
      <div className="fixed top-20 right-6 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onShowParentModal}
          className="flex items-center gap-2 bg-white shadow-md hover:bg-gray-50 border-gray-200"
        >
          <Settings className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {getActiveParentText()}
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFullModal(true)}
          className="flex items-center gap-1 bg-blue-50 shadow-md hover:bg-blue-100 border-blue-200"
          title="Pilih Ulang Wilayah"
        >
          <RotateCcw className="h-3 w-3 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">
            Pilih Ulang
          </span>
        </Button>
      </div>

      <WilayahSelector
        isOpen={showFullModal}
        onClose={() => setShowFullModal(false)}
        title="Pilih Ulang Wilayah"
        description="Silakan pilih wilayah induk untuk mengubah selection"
        maxLevel={getFullModalMaxLevel() as any}
        onSuccess={handleFullModalSuccess}
      />
    </>
  );
};
