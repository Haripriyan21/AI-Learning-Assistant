import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    const course1 = await prisma.course.create({
        data: {
            title: 'Introduction to Artificial Intelligence',
            description: 'Learn the fundamentals of AI, machine learning, and neural networks. Perfect for beginners who want to understand the basics of artificial intelligence.',
        }
    });
    const course2 = await prisma.course.create({
        data: {
            title: 'Web Development Fundamentals',
            description: 'Master the basics of web development including HTML, CSS, JavaScript, and modern frameworks. Build responsive and interactive websites.',
        }
    });
    console.log('✅ Created courses:', course1.title, 'and', course2.title);
    const aiLessons = [
        {
            title: 'What is Artificial Intelligence?',
            content: `Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines that work and react like humans. 

Key concepts covered:
- Definition and scope of AI
- History and evolution of AI
- Types of AI: Narrow AI vs General AI
- Real-world applications of AI

AI is transforming industries from healthcare to finance, making it one of the most exciting fields in technology today.`,
            courseId: course1.id
        },
        {
            title: 'Machine Learning Basics',
            content: `Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

Topics covered:
- Supervised vs Unsupervised Learning
- Training data and algorithms
- Model evaluation and validation
- Common ML algorithms: Linear Regression, Decision Trees, Neural Networks

Machine learning powers recommendation systems, image recognition, and many other AI applications.`,
            courseId: course1.id
        },
        {
            title: 'Neural Networks and Deep Learning',
            content: `Neural Networks are computing systems inspired by biological neural networks in human brains.

Deep Learning concepts:
- Artificial neurons and layers
- Forward and backward propagation
- Convolutional Neural Networks (CNNs)
- Recurrent Neural Networks (RNNs)
- Training deep networks with backpropagation

Deep learning has revolutionized fields like computer vision, natural language processing, and speech recognition.`,
            courseId: course1.id
        }
    ];
    const webLessons = [
        {
            title: 'HTML Fundamentals',
            content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages.

HTML basics:
- Document structure and elements
- Headings, paragraphs, and text formatting
- Links, images, and multimedia
- Forms and input elements
- Semantic HTML5 elements

HTML provides the structure and content of web pages, making it the foundation of web development.`,
            courseId: course2.id
        },
        {
            title: 'CSS Styling and Layout',
            content: `CSS (Cascading Style Sheets) is used to style and layout web pages.

CSS concepts:
- Selectors and properties
- Box model and layout
- Flexbox and Grid systems
- Responsive design principles
- CSS animations and transitions
- CSS frameworks and preprocessors

CSS transforms plain HTML into beautiful, responsive, and interactive web pages.`,
            courseId: course2.id
        },
        {
            title: 'JavaScript Programming',
            content: `JavaScript is a programming language that adds interactivity and dynamic behavior to web pages.

JavaScript fundamentals:
- Variables, data types, and operators
- Functions and scope
- DOM manipulation
- Event handling
- Asynchronous programming with Promises
- Modern ES6+ features

JavaScript is essential for creating interactive web applications and is now used for both frontend and backend development.`,
            courseId: course2.id
        }
    ];
    const allLessons = [...aiLessons, ...webLessons];
    for (const lessonData of allLessons) {
        await prisma.lesson.create({
            data: lessonData
        });
    }
    console.log('✅ Created', allLessons.length, 'lessons');
    const sampleUser = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqjqG2'
        }
    });
    console.log('✅ Created sample user:', sampleUser.email);
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- Courses created:', 2);
    console.log('- Lessons created:', allLessons.length);
    console.log('- Sample user created:', sampleUser.email);
    console.log('\n🔑 Sample user credentials:');
    console.log('- Email: john@example.com');
    console.log('- Password: test123');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map