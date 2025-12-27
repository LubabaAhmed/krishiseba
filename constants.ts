
import { Contact } from './types';

export const APP_NAME = "কৃষি সেবা";

export const UI_STRINGS = {
  loginTitle: "লগইন করুন",
  nameLabel: "আপনার নাম",
  phoneLabel: "ফোন নম্বর",
  loginBtn: "প্রবেশ করুন",
  dashboardTitle: "ড্যাশবোর্ড",
  analyzeCrop: "ফসল পরীক্ষা করুন",
  forum: "আলোচনা সভা",
  emergency: "জরুরি যোগাযোগ",
  uploadPhoto: "ছবি আপলোড করুন বা তুলুন",
  analyzing: "বিশ্লেষণ করা হচ্ছে...",
  resultTitle: "ফলাফল",
  solutionTitle: "সমাধান",
  urgencyTitle: "জরুরি অবস্থা",
  noPosts: "এখনও কোন আলোচনা নেই",
  newPost: "নতুন প্রশ্ন করুন",
  postTitle: "শিরোনাম",
  postContent: "আপনার সমস্যা বিস্তারিত লিখুন",
  submit: "জমা দিন",
  reply: "উত্তর দিন",
  back: "পিছনে",
  logout: "লগআউট"
};

export const EMERGENCY_CONTACTS: Contact[] = [
  {
    name: "কৃষি কল সেন্টার",
    number: "১৬১২৩",
    designation: "টোল-ফ্রি হেল্পলাইন",
    location: "বাংলাদেশ"
  },
  {
    name: "কৃষি সম্প্রসারণ অধিদপ্তর",
    number: "০২-৯১১০৬৫৫",
    designation: "প্রধান কার্যালয়",
    location: "খামারবাড়ি, ঢাকা"
  },
  {
    name: "উদ্ভিদ সংগনিরোধ উইং",
    number: "০২-৯১১০৪০৫",
    designation: "রোগ নিয়ন্ত্রণ শাখা",
    location: "ঢাকা"
  }
];
