// Credits for every photo in public/images/web/, shown on the /credits/ page.
// All come from Wikimedia Commons; each licence was checked on the file's page before use.
// Each photo is cropped, resized and converted to WebP (a desktop file and a smaller "-800" or "-mobile" file).
// To add a photo: put it in public/images/web/ and add one entry here.

export type Credit = {
  file: string;
  title: string;
  author: string;
  source: string;
  licence: string;
  licenceUrl: string;
};

export const CREDITS: Credit[] = [
  {
    file: "hero-goats.webp",
    title: "Cattle and goats in India (2016)",
    author: "Soumyabrata Roy",
    source: "https://commons.wikimedia.org/wiki/File:Cattle_and_goats_in_India_(2016).jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    file: "banner-about.webp",
    title: "Countryside near the river, Panchgani",
    author: "Nitish Kadam",
    source: "https://commons.wikimedia.org/wiki/File:Countryside_near_the_river_(Unsplash).jpg",
    licence: "CC0 1.0 (public domain dedication)",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  {
    file: "banner-project.webp",
    title: "Bicycle for a Milkman",
    author: "Paul Hamilton",
    source: "https://commons.wikimedia.org/wiki/File:Bicycle_for_a_Milkman_(5281814656).jpg",
    licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  {
    file: "banner-care-guide.webp",
    title: "Beetal Goat Flock",
    author: "Akbarkq",
    source: "https://commons.wikimedia.org/wiki/File:Beetal_Goat_Flock.JPG",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    file: "banner-women-training.webp",
    title: "Goat rearing rural woman India village livestock management",
    author: "Vraj Acharya, WELL Labs",
    source: "https://commons.wikimedia.org/wiki/File:Goat_rearing_rural_woman_India_village_livestock_management.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    file: "banner-events.webp",
    title: "Bullock ploughing, sowing groundnut and black-eyed peas, Raichur, Karnataka",
    author: "Nanditha Gogate, WELL Labs",
    source: "https://commons.wikimedia.org/wiki/File:Bullock_ploughing_sowing_groundnut_blackeyed_peas_Raichur_Karnataka_India.jp.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    file: "banner-staff.webp",
    title: "Western ghats",
    author: "Alosh Bennett",
    source: "https://commons.wikimedia.org/wiki/File:Western_ghats_(267042779).jpg",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    file: "banner-contact.webp",
    title: "Sahyadri Range at Bhimashankar, Maharashtra, India",
    author: "Rohit Sharma",
    source: "https://commons.wikimedia.org/wiki/File:Sahyadri_Range_at_Bhimashankar,_Maharashtra,_India.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    file: "goat-kids.webp",
    title: "India - Sights & Culture - baby goats hanging out",
    author: "McKay Savage",
    source: "https://commons.wikimedia.org/wiki/File:India_-_Sights_%26_Culture_-_baby_goats_hanging_out_(6321980634).jpg",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    file: "goats-grazing.webp",
    title: "Goats going into forest",
    author: "Bhaskaranaidu",
    source: "https://commons.wikimedia.org/wiki/File:Goats_going_into_forest.JPG",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    file: "goat-fodder.webp",
    title: "Goat With Meal",
    author: "Siddharth Variyath",
    source: "https://commons.wikimedia.org/wiki/File:Goat_With_Meal.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    file: "milk-cans.webp",
    title: "Milk Containers on a Bus",
    author: "LOVEofZ",
    source: "https://commons.wikimedia.org/wiki/File:Milk_Containers_on_a_Bus.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
];
