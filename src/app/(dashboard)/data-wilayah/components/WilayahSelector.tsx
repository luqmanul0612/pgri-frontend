"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import {
  getProvinces,
  getCities,
  getDistricts,
  getSubdistricts,
} from "../serverActions/wilayah-actions";

interface WilayahSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  maxLevel: "provinces" | "cities" | "districts" | "subdistricts";
  onSuccess: (selections: {
    province?: any;
    city?: any;
    district?: any;
    subdistrict?: any;
  }) => void;
}

export const WilayahSelector: React.FC<WilayahSelectorProps> = ({
  isOpen,
  onClose,
  title,
  description,
  maxLevel,
  onSuccess,
}) => {
  const [selections, setSelections] = useState<{
    province?: any;
    city?: any;
    district?: any;
    subdistrict?: any;
  }>({});

  const [availableData, setAvailableData] = useState<{
    provinces: any[];
    cities: any[];
    districts: any[];
    subdistricts: any[];
  }>({
    provinces: [],
    cities: [],
    districts: [],
    subdistricts: [],
  });

  const [loading, setLoading] = useState<{
    provinces: boolean;
    cities: boolean;
    districts: boolean;
    subdistricts: boolean;
  }>({
    provinces: false,
    cities: false,
    districts: false,
    subdistricts: false,
  });

  // Load provinces on mount
  useEffect(() => {
    if (isOpen) {
      loadProvinces();
    }
  }, [isOpen]);

  const loadProvinces = async () => {
    setLoading(prev => ({ ...prev, provinces: true }));
    try {
      const provinces = await getProvinces();
      setAvailableData(prev => ({ ...prev, provinces }));
    } catch (error) {
      console.error("Error loading provinces:", error);
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const loadCities = async (provinceId: string) => {
    setLoading(prev => ({ ...prev, cities: true }));
    try {
      const cities = await getCities(provinceId);
      setAvailableData(prev => ({ ...prev, cities }));
    } catch (error) {
      console.error("Error loading cities:", error);
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const loadDistricts = async (cityId: string) => {
    setLoading(prev => ({ ...prev, districts: true }));
    try {
      const districts = await getDistricts(cityId);
      setAvailableData(prev => ({ ...prev, districts }));
    } catch (error) {
      console.error("Error loading districts:", error);
    } finally {
      setLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const loadSubdistricts = async (districtId: string) => {
    setLoading(prev => ({ ...prev, subdistricts: true }));
    try {
      const subdistricts = await getSubdistricts(districtId);
      setAvailableData(prev => ({ ...prev, subdistricts }));
    } catch (error) {
      console.error("Error loading subdistricts:", error);
    } finally {
      setLoading(prev => ({ ...prev, subdistricts: false }));
    }
  };

  const handleProvinceSelect = (provinceId: string) => {
    const province = availableData.provinces.find(p => p.id === provinceId);
    if (province) {
      const newSelections = { province, city: undefined, district: undefined, subdistrict: undefined };
      setSelections(newSelections);
      setAvailableData(prev => ({ ...prev, cities: [], districts: [], subdistricts: [] }));
      loadCities(provinceId);
    }
  };

  const handleCitySelect = (cityId: string) => {
    const city = availableData.cities.find(c => c.id === cityId);
    if (city) {
      const newSelections = { ...selections, city, district: undefined, subdistrict: undefined };
      setSelections(newSelections);
      setAvailableData(prev => ({ ...prev, districts: [], subdistricts: [] }));
      if (maxLevel === "districts" || maxLevel === "subdistricts") {
        loadDistricts(cityId);
      }
    }
  };

  const handleDistrictSelect = (districtId: string) => {
    const district = availableData.districts.find(d => d.id === districtId);
    if (district) {
      const newSelections = { ...selections, district, subdistrict: undefined };
      setSelections(newSelections);
      setAvailableData(prev => ({ ...prev, subdistricts: [] }));
      if (maxLevel === "subdistricts") {
        loadSubdistricts(districtId);
      }
    }
  };

  const handleSubdistrictSelect = (subdistrictId: string) => {
    const subdistrict = availableData.subdistricts.find(s => s.id === subdistrictId);
    if (subdistrict) {
      const newSelections = { ...selections, subdistrict };
      setSelections(newSelections);
    }
  };

  const handleConfirm = () => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const selectedParentRegion = {
        provinceCode: selections.province?.id,
        provinceName: selections.province?.name,
        cityCode: selections.city?.id,
        cityName: selections.city?.name,
        districtCode: selections.district?.id,
        districtName: selections.district?.name,
      };

      localStorage.setItem('pgri-wilayah-selection', JSON.stringify({
        selectedWilayah: maxLevel,
        selectedParentRegion
      }));
    }

    onSuccess(selections);
    onClose();
  };

  const isConfirmDisabled = () => {
    switch (maxLevel) {
      case "provinces":
        return !selections.province;
      case "cities":
        return !selections.province || !selections.city;
      case "districts":
        return !selections.province || !selections.city || !selections.district;
      case "subdistricts":
        return !selections.province || !selections.city || !selections.district || !selections.subdistrict;
      default:
        return true;
    }
  };

  const provinceOptions = availableData.provinces.map(p => ({
    value: p.id,
    label: p.name,
  }));

  const cityOptions = availableData.cities.map(c => ({
    value: c.id,
    label: c.name,
  }));

  const districtOptions = availableData.districts.map(d => ({
    value: d.id,
    label: d.name,
  }));

  const subdistrictOptions = availableData.subdistricts.map(s => ({
    value: s.id,
    label: s.name,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Province Combobox */}
          <div>
            <label className="text-sm font-medium mb-2 block">Provinsi</label>
            <Combobox
              options={provinceOptions}
              value={selections.province?.id || ""}
              onValueChange={handleProvinceSelect}
              placeholder="Pilih Provinsi"
              searchPlaceholder="Cari provinsi..."
              disabled={loading.provinces}
            />
          </div>

          {/* City Combobox */}
          {maxLevel === "cities" || maxLevel === "districts" || maxLevel === "subdistricts" ? (
            <div>
              <label className="text-sm font-medium mb-2 block">Kabupaten/Kota</label>
              <Combobox
                options={cityOptions}
                value={selections.city?.id || ""}
                onValueChange={handleCitySelect}
                placeholder="Pilih Kabupaten/Kota"
                searchPlaceholder="Cari kabupaten/kota..."
                disabled={!selections.province || loading.cities}
              />
            </div>
          ) : null}

          {/* District Combobox */}
          {maxLevel === "districts" || maxLevel === "subdistricts" ? (
            <div>
              <label className="text-sm font-medium mb-2 block">Kecamatan</label>
              <Combobox
                options={districtOptions}
                value={selections.district?.id || ""}
                onValueChange={handleDistrictSelect}
                placeholder="Pilih Kecamatan"
                searchPlaceholder="Cari kecamatan..."
                disabled={!selections.city || loading.districts}
              />
            </div>
          ) : null}

          {/* Subdistrict Combobox */}
          {maxLevel === "subdistricts" ? (
            <div>
              <label className="text-sm font-medium mb-2 block">Desa/Kelurahan</label>
              <Combobox
                options={subdistrictOptions}
                value={selections.subdistrict?.id || ""}
                onValueChange={handleSubdistrictSelect}
                placeholder="Pilih Desa/Kelurahan"
                searchPlaceholder="Cari desa/kelurahan..."
                disabled={!selections.district || loading.subdistricts}
              />
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleConfirm} disabled={isConfirmDisabled()}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};