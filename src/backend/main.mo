import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  // Data Types
  type Student = {
    fullName : Text;
    email : Text;
    phone : Text;
    courseInterest : Text;
    city : Text;
    registrationDate : Text;
  };

  type Course = {
    id : Nat;
    name : Text;
    description : Text;
  };

  type WhyChooseUsItem = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type Content = {
    heroHeading : Text;
    heroTagline : Text;
    aboutText : Text;
    courses : [Course];
    whyChooseUs : [WhyChooseUsItem];
    heroImageUrl : Text;
    aboutImageUrl : Text;
  };

  // Persistent Storage
  let students = Map.empty<Text, Student>();
  let contentMap = Map.empty<Nat, Course>();
  let whyChooseUsMap = Map.empty<Nat, WhyChooseUsItem>();
  var nextCourseId = 8;
  let sessions = Map.empty<Text, ()>();

  // Seed default content using stable variables
  public shared ({ caller }) func seedDefaults() : async () {
    contentMap.add(0, { id = 0; name = "Python Programming"; description = "Learn the fundamentals of Python programming language, including syntax, data structures, and algorithms." });
    contentMap.add(1, { id = 1; name = "Web Development (HTML/CSS/JS)"; description = "Master the core technologies for building modern websites: HTML, CSS, and JavaScript." });
    contentMap.add(2, { id = 2; name = "React & Frontend Development"; description = "Dive into React and learn how to build dynamic, responsive web applications." });
    contentMap.add(3, { id = 3; name = "Data Science & ML"; description = "Explore the world of data science, machine learning techniques, and real-world analytics." });
    contentMap.add(4, { id = 4; name = "Java Programming"; description = "Comprehensive Java training covering OOP principles and practical application development." });
    contentMap.add(5, { id = 5; name = "Database Management (SQL)"; description = "Master relational databases, SQL queries, and efficient data management practices." });
    contentMap.add(6, { id = 6; name = "Mobile App Development"; description = "Learn cross-platform mobile app development for iOS and Android devices." });
    contentMap.add(7, { id = 7; name = "Cybersecurity Fundamentals"; description = "Gain practical knowledge in securing digital assets, ethical hacking, and protecting against cyber threats." });

    whyChooseUsMap.add(0, { id = 0; title = "Expert Mentors"; description = "Learn from experienced industry professionals." });

    whyChooseUsMap.add(1, { id = 1; title = "Hands-On Projects"; description = "Apply your knowledge through real-world projects." });

    whyChooseUsMap.add(2, { id = 2; title = "Job Placement Support"; description = "Get assistance with job hunting and interview preparation." });

    whyChooseUsMap.add(3, { id = 3; title = "Flexible Batch Timings"; description = "Choose batch timings that fit your schedule." });

    whyChooseUsMap.add(4, { id = 4; title = "Affordable Fees"; description = "Access quality education at affordable prices." });

    whyChooseUsMap.add(5, { id = 5; title = "Industry-Relevant Curriculum"; description = "Stay ahead of the technology curve with up-to-date courses." });
  };

  module Course {
    public func compare(a : Course, b : Course) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module WhyChooseUsItem {
    public func compare(a : WhyChooseUsItem, b : WhyChooseUsItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Business Lengths
  public query ({ caller }) func getCoursesLength() : async Nat {
    contentMap.size();
  };

  public query ({ caller }) func getWhyChooseUsLength() : async Nat {
    whyChooseUsMap.size();
  };

  // Student Registration
  public shared ({ caller }) func submitRegistration(fullName : Text, email : Text, phone : Text, courseInterest : Text, city : Text, registrationDate : Text) : async () {
    let student = {
      fullName;
      email;
      phone;
      courseInterest;
      city;
      registrationDate;
    };
    students.add(email, student);
  };

  public query ({ caller }) func getRegistrations(sessionToken : Text) : async [Student] {
    validateSession(sessionToken);
    students.toArray().map(func((_, student)) { student });
  };

  // Admin Authentication
  let adminPassword = "Goldy2026";

  func generateSessionToken() : Text {
    let timestamp = 0.toText();
    let token = "token-" # timestamp;
    sessions.add(token, ());
    token;
  };

  public shared ({ caller }) func adminLogin(password : Text) : async Text {
    if (password != adminPassword) {
      Runtime.trap("Incorrect password");
    };
    generateSessionToken();
  };

  public shared ({ caller }) func adminLogout(token : Text) : async () {
    sessions.remove(token);
  };

  func validateSession(sessionToken : Text) {
    if (not sessions.containsKey(sessionToken)) {
      Runtime.trap("Invalid session token");
    };
  };

  // Content Management
  public query ({ caller }) func getContent() : async Content {
    let courses = contentMap.values().toArray().sort();
    let whyChooseUs = whyChooseUsMap.values().toArray().sort();
    {
      heroHeading = "EDUTECH";
      heroTagline = "Where Skills Meet Technology";
      aboutText = "EDUTECH is a premier software coaching institute dedicated to transforming aspiring learners into industry-ready professionals. With expert mentors, hands-on projects, and a cutting-edge curriculum, we prepare you for the careers of tomorrow.";
      courses;
      whyChooseUs;
      heroImageUrl = "/assets/generated/hero-bg.dim_1920x1080.jpg";
      aboutImageUrl = "";
    };
  };

  public shared ({ caller }) func updateContent(sessionToken : Text, heroHeading : Text, heroTagline : Text, aboutText : Text, heroImageUrl : Text, aboutImageUrl : Text) : async () {
    validateSession(sessionToken);
    ();
  };

  public shared ({ caller }) func updateCourse(sessionToken : Text, id : Nat, name : Text, description : Text) : async () {
    validateSession(sessionToken);

    switch (contentMap.get(id)) {
      case (?course) {
        let updatedCourse = {
          id;
          name;
          description;
        };
        contentMap.add(id, updatedCourse);
      };
      case (null) {
        Runtime.trap("Course with id " # id.toText() # " not found");
      };
    };
  };

  public shared ({ caller }) func addCourse(sessionToken : Text, name : Text, description : Text) : async Nat {
    validateSession(sessionToken);

    let newId = nextCourseId;
    let newCourse = {
      id = newId;
      name;
      description;
    };
    contentMap.add(newId, newCourse);
    nextCourseId += 1;
    newId;
  };

  public shared ({ caller }) func removeCourse(sessionToken : Text, id : Nat) : async () {
    validateSession(sessionToken);

    if (not contentMap.containsKey(id)) {
      Runtime.trap("Course with id " # id.toText() # " not found");
    };
    contentMap.remove(id);
  };

  public shared ({ caller }) func updateWhyChooseUs(sessionToken : Text, id : Nat, title : Text, description : Text) : async () {
    validateSession(sessionToken);

    switch (whyChooseUsMap.get(id)) {
      case (?item) {
        let updatedItem = {
          id;
          title;
          description;
        };
        whyChooseUsMap.add(id, updatedItem);
      };
      case (null) {
        Runtime.trap("WhyChooseUs item with id " # id.toText() # " not found");
      };
    };
  };

  public query ({ caller }) func getSpecificCourse(courseId : Nat) : async Course {
    switch (contentMap.get(courseId)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?course) { course };
    };
  };

  public query ({ caller }) func getSpecificWhyChooseUs(whyChooseUsId : Nat) : async WhyChooseUsItem {
    switch (whyChooseUsMap.get(whyChooseUsId)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?whyChooseUs) { whyChooseUs };
    };
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    contentMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllWhyChooseUs() : async [WhyChooseUsItem] {
    whyChooseUsMap.values().toArray().sort();
  };
};
