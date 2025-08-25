# 🎓 LMS Platform

A modern, open-source Learning Management System (LMS) built with Next.js 15, Sanity CMS, and Stripe payments. This platform provides a complete solution for creating, managing, and delivering online courses with a beautiful, responsive interface.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-3.78.1-orange?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![Stripe](https://img.shields.io/badge/Stripe-17.7.0-008CDD?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Course Management**: Create, edit, and organize courses with modules and lessons
- 👥 **User Authentication**: Secure authentication with Clerk
- 💳 **Payment Processing**: Integrated Stripe payments for course enrollment
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎨 **Modern UI**: Beautiful interface with dark/light mode support
- 📊 **Progress Tracking**: Monitor student progress through courses
- 🎥 **Video Support**: Embed videos from YouTube, Loom, and other platforms
- 🔍 **Search Functionality**: Find courses quickly with search capabilities
- 📝 **Rich Content**: Rich text editing with PortableText
- 🚀 **Performance**: Built with Next.js 15 and Turbopack for optimal performance

## 🏗️ Architecture

- **Frontend**: Next.js 15 with App Router
- **Backend**: Next.js API routes
- **Database**: Sanity CMS (Headless CMS)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **Type Safety**: TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS version recommended)
- pnpm (recommended) or npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lms-platform.git
cd lms-platform
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-08
SANITY_API_TOKEN=your_sanity_api_token
SANITY_STUDIO_DATASET=production

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable

# Base URL (for development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Sanity Setup

1. **Create a Sanity Project**:

   - Go to [sanity.io](https://www.sanity.io/)
   - Create a new project
   - Copy your project ID and dataset name

2. **Generate Sanity Types**:

   ```bash
   pnpm run typegen
   ```

3. **Start Sanity Studio**:
   ```bash
   pnpm run dev
   # Navigate to http://localhost:3000/studio
   ```

### 5. Start Development Server

```bash
pnpm run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your application.

## 📁 Project Structure

```
lms-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Admin dashboard routes
│   │   ├── (dashboard)/       # User dashboard routes
│   │   ├── (user)/            # Public user routes
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   └── providers/        # Context providers
│   ├── lib/                  # Utility functions and configurations
│   └── sanity/               # Sanity CMS configuration
│       ├── lib/              # Sanity client and queries
│       ├── schemaTypes/      # Content schema definitions
│       └── structure.ts      # Studio structure configuration
├── public/                   # Static assets
├── sanity.config.ts          # Sanity configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Components

### Authentication System

- **Clerk Integration**: Secure user authentication and management
- **Protected Routes**: Role-based access control for admin and user areas
- **User Profiles**: Student and instructor profile management

### Course Management

- **Course Creation**: Build courses with modules and lessons
- **Content Types**: Support for text, video, and interactive content
- **Progress Tracking**: Monitor student completion and progress

### Payment System

- **Stripe Integration**: Secure payment processing
- **Course Enrollment**: Automatic enrollment after successful payment
- **Webhook Handling**: Real-time payment status updates

### Content Management

- **Sanity Studio**: Visual content editor
- **Rich Text**: PortableText for rich content editing
- **Media Management**: Image and video handling

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run ESLint

# Sanity
pnpm run typegen      # Generate TypeScript types from Sanity schema
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Tailwind CSS**: Utility-first CSS framework

### Database Schema

The platform uses Sanity CMS with the following main content types:

- **Course**: Main course information and metadata
- **Module**: Course sections containing lessons
- **Lesson**: Individual learning units
- **Student**: User information and enrollment data
- **Instructor**: Course creator information
- **Enrollment**: Student-course relationship
- **LessonCompletion**: Progress tracking

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:

   - Push your code to GitHub
   - Connect your repository to Vercel

2. **Environment Variables**:

   - Add all production environment variables in Vercel dashboard
   - Ensure `NODE_ENV=production`

3. **Deploy**:
   - Vercel will automatically deploy on push to main branch

### Other Platforms

- **Netlify**: Similar to Vercel deployment
- **Railway**: Good for full-stack applications
- **DigitalOcean**: Self-hosted option

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/lms-platform.git
cd lms-platform
git remote add upstream https://github.com/originalowner/lms-platform.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests if applicable
- Update documentation

### 4. Commit and Push

```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 5. Create a Pull Request

- Describe your changes clearly
- Reference any related issues
- Wait for review and feedback

### Development Guidelines

- **TypeScript**: Use strict typing
- **Components**: Create reusable, well-documented components
- **Testing**: Add tests for new features
- **Documentation**: Update README and code comments

## 🐛 Troubleshooting

### Common Issues

1. **Sanity Connection Error**:

   - Verify your project ID and dataset
   - Check API token permissions
   - Ensure environment variables are set correctly

2. **Stripe Payment Issues**:

   - Verify Stripe keys are correct
   - Check webhook endpoint configuration
   - Ensure proper redirect URLs

3. **Authentication Problems**:
   - Verify Clerk configuration
   - Check environment variables
   - Ensure proper domain configuration

### Getting Help

- **Issues**: Create a GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the code comments and this README

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Sanity** for the headless CMS
- **Stripe** for payment processing
- **Clerk** for authentication
- **Tailwind CSS** for the utility-first CSS framework
- **All Contributors** who help improve this project

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/lms-platform/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/yourusername/lms-platform/discussions)
- **Email**: your-email@example.com

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by the LMS Platform community.
