import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    storefrontCourse(
      courseId: CourseId!
      bundleId: BundleId!
    ): StorefrontCourse

    storefrontCourses: [StorefrontCourse!]!
  }

  type StorefrontCourse {
    header: String!
    courseId: CourseId!
    url: String!
    imageUrl: String!
    bundle: Bundle!
  }

  type Bundle {
    header: String!
    bundleId: BundleId!
    price: Int!
    imageUrl: String!
  }
`;
