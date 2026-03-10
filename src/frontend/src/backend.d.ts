import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Student {
    city: string;
    fullName: string;
    email: string;
    courseInterest: string;
    phone: string;
    registrationDate: string;
}
export interface WhyChooseUsItem {
    id: bigint;
    title: string;
    description: string;
}
export interface Content {
    heroImageUrl: string;
    courses: Array<Course>;
    heroHeading: string;
    whyChooseUs: Array<WhyChooseUsItem>;
    aboutImageUrl: string;
    aboutText: string;
    heroTagline: string;
}
export interface Course {
    id: bigint;
    name: string;
    description: string;
}
export interface backendInterface {
    addCourse(sessionToken: string, name: string, description: string): Promise<bigint>;
    adminLogin(password: string): Promise<string>;
    adminLogout(token: string): Promise<void>;
    getAllCourses(): Promise<Array<Course>>;
    getAllWhyChooseUs(): Promise<Array<WhyChooseUsItem>>;
    getContent(): Promise<Content>;
    getCoursesLength(): Promise<bigint>;
    getRegistrations(sessionToken: string): Promise<Array<Student>>;
    getSpecificCourse(courseId: bigint): Promise<Course>;
    getSpecificWhyChooseUs(whyChooseUsId: bigint): Promise<WhyChooseUsItem>;
    getWhyChooseUsLength(): Promise<bigint>;
    removeCourse(sessionToken: string, id: bigint): Promise<void>;
    seedDefaults(): Promise<void>;
    submitRegistration(fullName: string, email: string, phone: string, courseInterest: string, city: string, registrationDate: string): Promise<void>;
    updateContent(sessionToken: string, heroHeading: string, heroTagline: string, aboutText: string, heroImageUrl: string, aboutImageUrl: string): Promise<void>;
    updateCourse(sessionToken: string, id: bigint, name: string, description: string): Promise<void>;
    updateWhyChooseUs(sessionToken: string, id: bigint, title: string, description: string): Promise<void>;
}
