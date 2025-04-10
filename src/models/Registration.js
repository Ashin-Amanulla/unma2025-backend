import mongoose from 'mongoose';

const AttendeesSchema = new mongoose.Schema({
  adults: {
    veg: { type: Number, default: 0, min: 0 },
    nonVeg: { type: Number, default: 0, min: 0 }
  },
  teens: {
    veg: { type: Number, default: 0, min: 0 },
    nonVeg: { type: Number, default: 0, min: 0 }
  },
  children: {
    veg: { type: Number, default: 0, min: 0 },
    nonVeg: { type: Number, default: 0, min: 0 }
  },
  toddlers: {
    veg: { type: Number, default: 0, min: 0 },
    nonVeg: { type: Number, default: 0, min: 0 }
  }
}, { _id: false });

const RegistrationSchema = new mongoose.Schema({
  registrationType: { type: String, enum: ['Alumni', 'Staff', 'Other'], required: true },

  // Contact Information
  name: { type: String, maxlength: 100, required: true },
  contactNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, default: false, required: true },

  // Common Fields
  country: { type: String, required: true },
  stateUT: { type: String },
  district: { type: String },
  captchaVerified: { type: Boolean, default: false, required: true },
  verificationQuizPassed: { type: Boolean, default: false },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''] },

  // Alumni Specific Fields
  school: { type: String },
  yearOfPassing: { type: String },

  // Staff Specific Fields
  schoolsWorked: { type: String },
  yearsOfWorking: { type: String },
  currentPosition: { type: String },

  // Other Specific Fields
  purpose: { type: String },

  // Professional Information
  profession: { type: String },
  professionalDetails: { type: String },
  businessDetails: { type: String },
  areaOfExpertise: { type: String },
  keySkills: { type: String, maxlength: 500 },

  // Event Attendance
  isAttending: { type: Boolean, required: true },
  attendees: { type: AttendeesSchema, default: () => ({}) },
  totalVeg: { type: Number, min: 0, default: 0 },
  totalNonVeg: { type: Number, min: 0, default: 0 },
  eventContribution: [{ type: String }],
  contributionDetails: { type: String },

  // Sponsorship
  interestedInSponsorship: { type: Boolean, default: false },
  sponsorshipType: [{ type: String }],
  sponsorshipDetails: { type: String },
  sponsorshipTier: { type: String },

  // Transportation
  startPincode: { type: String },
  district: { type: String },
  state: { type: String },
  taluk: { type: String },
  originArea: { type: String },
  nearestLandmark: { type: String },
  travelDate: { type: String },
  travelTime: { type: String },
  modeOfTransport: { type: String },
  travellingFrom: { type: String },
  travelDateTime: { type: Date },

  // Ride sharing
  readyForRideShare: { type: String },
  rideShareCapacity: { type: Number, min: 0 },
  needParking: { type: String },
  wantRideShare: { type: String },
  rideShareGroupSize: { type: Number, min: 0 },
  carPooling: { type: String, enum: ['No', 'Yes To Venue', 'Yes From Venue', 'Yes Both Ways', ''] },
  coShareSeats: { type: Number, min: 0 },
  landmarks: { type: String },
  travelRemarks: { type: String },
  travelSpecialRequirements: { type: String },

  // Accommodation
  accommodation: { type: String },
  accommodationCapacity: { type: Number, min: 0 },
  accommodationLocation: { type: String },
  accommodationRemarks: { type: String },

  // Financial Contribution
  willContribute: { type: Boolean, default: false },
  contributionAmount: { type: Number, min: 0, default: 0 },
  proposedAmount: { type: Number, min: 0, default: 0 },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  paymentId: { type: String },
  paymentDetails: { type: String },
  paymentRemarks: { type: String },

  // Optional Fields
  spouseNavodayan: { type: String, enum: ['', 'Yes', 'No'] },
  unmaFamilyGroups: { type: String, enum: ['', 'Yes', 'No'] },
  mentorshipOptions: [{ type: String }],
  mentorshipInterest: { type: Boolean, default: false },
  mentorshipAreas: [{ type: String }],
  trainingOptions: [{ type: String }],
  seminarOptions: [{ type: String }],
  tshirtInterest: { type: String, enum: ['', 'yes', 'no'] },
  tshirtSizes: { type: Map, of: Number },

  // Metadata
  registrationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  userAgent: { type: String },
  lastUpdatedBy: { type: String },
  registrationStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  formSubmissionComplete: { type: Boolean, default: false },

  // Step completion tracking
  step1Complete: { type: Boolean, default: false },
  step2Complete: { type: Boolean, default: false },
  step3Complete: { type: Boolean, default: false },
  step4Complete: { type: Boolean, default: false },
  step5Complete: { type: Boolean, default: false },
  currentStep: { type: Number, default: 1, min: 1, max: 5 }
});

// Create a compound index to allow uniqueness checks on email or contactNumber
// but prevent duplicates when the same user registers again
RegistrationSchema.index(
  { email: 1, registrationType: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true, $ne: '' } } }
);

RegistrationSchema.index(
  { contactNumber: 1, registrationType: 1 },
  { unique: true, partialFilterExpression: { contactNumber: { $exists: true, $ne: '' } } }
);

// Add a text index for search functionality
RegistrationSchema.index({
  name: 'text',
  email: 'text',
  contactNumber: 'text',
  school: 'text',
  profession: 'text'
});

const Registration = mongoose.model('Registration', RegistrationSchema);

export default Registration;
