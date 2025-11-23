import banner1 from "@/assets/images/banner-1.webp";

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
  { name: "Training A", value: 250 },
  { name: "Training B", value: 850 },
  { name: "Training C", value: 250 },
  { name: "Training D", value: 50 },
  { name: "Training E", value: 150 },
];

const membershipData = [
  { name: "Training A", value: 250 },
  { name: "Training B", value: 850 },
  { name: "Training C", value: 250 },
  { name: "Training D", value: 50 },
  { name: "Training E", value: 150 },
];

const pieChartColors = ["#BF19B8", "#DC3545", "#007BFF", "#FFC107", "#0EC516"];

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
    membershipData,
    pieChartColors,
    banners,
  };
};

export default useDashboardMemberAdmin;
