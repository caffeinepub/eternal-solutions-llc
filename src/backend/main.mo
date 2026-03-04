import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Custom Types and Comparison Functions
  type IntakeSubmission = {
    id : Nat;
    fullName : Text;
    phone : Text;
    email : Text;
    propertyAddress : Text;
    preferredContact : Text;
    insuranceCompany : Text;
    policyNumber : Text;
    propertyType : Text;
    dateOfLoss : Text;
    causeOfLoss : Text;
    damageDescription : Text;
    fileIds : [Text];
    submittedAt : Int;
    status : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module IntakeSubmission {
    public func compare(a : IntakeSubmission, b : IntakeSubmission) : Order.Order {
      Nat.compare(b.id, a.id);
    };
  };

  // State Management
  let submissions = Map.empty<Nat, IntakeSubmission>();
  var nextId = 1;
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Endpoints
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Intake Endpoints
  public shared ({ caller }) func submitIntakeForm(
    fullName : Text,
    phone : Text,
    email : Text,
    propertyAddress : Text,
    preferredContact : Text,
    insuranceCompany : Text,
    policyNumber : Text,
    propertyType : Text,
    dateOfLoss : Text,
    causeOfLoss : Text,
    damageDescription : Text,
    fileIds : [Text],
  ) : async Nat {
    let id = nextId;
    nextId += 1;

    let record : IntakeSubmission = {
      id;
      fullName;
      phone;
      email;
      propertyAddress;
      preferredContact;
      insuranceCompany;
      policyNumber;
      propertyType;
      dateOfLoss;
      causeOfLoss;
      damageDescription;
      fileIds;
      submittedAt = Time.now();
      status = "Pending";
    };

    submissions.add(id, record);
    id;
  };

  // Admin Endpoints
  public query ({ caller }) func getSubmission(id : Nat) : async IntakeSubmission {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Record not found.") };
      case (?record) { record };
    };
  };

  public query ({ caller }) func getSubmissions() : async [IntakeSubmission] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    submissions.values().toArray().sort();
  };

  public shared ({ caller }) func updateSubmissionStatus(id : Nat, status : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update submission status");
    };
    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Record not found.") };
      case (?record) {
        let updated = { record with status };
        submissions.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteSubmission(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete submissions");
    };
    if (not submissions.containsKey(id)) {
      Runtime.trap("Record not found.");
    };
    submissions.remove(id);
  };
};
