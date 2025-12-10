import banner1 from "@/assets/images/banner-1.webp";
import { ChartData } from "chart.js";

const registerGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
];

const asnGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
];

const nonAsnGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
  { value: 50 },
];

const trainingData = [
  { label: "Training A", value: 250 },
  { label: "Training B", value: 850 },
  { label: "Training C", value: 250 },
  { label: "Training D", value: 50 },
  { label: "Training E", value: 150 },
];

const genderData = [
  { label: "Laki - Laki", value: 250 },
  { label: "Perempuan", value: 850 },
];

const trainingColors = ["#BF19B8", "#DC3545", "#007BFF", "#FFC107", "#0EC516"];
const genderColors = ["#0EC516", "#FFC107"];

const banners = [
  {
    key: "banner-1",
    image: banner1,
  },
  {
    key: "banner-2",
    image: banner1,
  },
  {
    key: "banner-3",
    image: banner1,
  },
];

const useDashboardMemberAdmin = () => {
  return {
    registerGrowthData,
    asnGrowthData,
    nonAsnGrowthData,
    trainingData,
    genderData,
    trainingColors,
    banners,
    genderColors,
  };
};

export default useDashboardMemberAdmin;
