
# Contributing Guide

Welcome to RemitFlow! We're excited that you're interested in contributing to our international money transfer platform. This guide will help you get started with contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contribution Types](#contribution-types)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct:

### Our Pledge

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them succeed
- **Be collaborative**: Work together towards common goals
- **Be constructive**: Provide helpful feedback and suggestions

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling, insulting, or derogatory comments
- Publishing private information without permission
- Any conduct that would be considered inappropriate in a professional setting

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (v18.0.0 or higher)
- Bun or npm package manager
- Git for version control
- Code editor (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/remitflow.git
   cd remitflow
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-repo/remitflow.git
   ```

### Set Up Development Environment

1. **Install dependencies**:
   ```bash
   bun install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   bun run dev
   ```

4. **Verify setup**: Visit `http://localhost:5173`

## 🔄 Development Workflow

### Branching Strategy

We use a simplified Git flow:

```
main (production-ready)
 ↑
develop (integration branch)
 ↑
feature/your-feature-name (your work)
```

### Creating a Feature Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make your changes...

# Commit your changes
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(transfer): add mobile money delivery method
fix(exchange): correct currency conversion calculation
docs: update API documentation for new endpoints
test(components): add unit tests for AmountInput component
```

## 🎯 Contribution Types

### 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior** vs **actual behavior**
4. **Environment details** (browser, OS, etc.)
5. **Screenshots** or error messages if applicable

**Bug Report Template:**
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., macOS 12.0]
- Browser: [e.g., Chrome 95.0]
- Node.js: [e.g., 18.0.0]
```

### ✨ Feature Requests

For feature requests, provide:

1. **Problem statement**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternative solutions**: Other approaches considered
4. **Use cases**: Who would benefit from this feature?

### 🔧 Code Contributions

We welcome contributions in these areas:

- **Frontend Components**: React components and UI improvements
- **Backend Services**: API endpoints and business logic
- **Testing**: Unit tests, integration tests, and E2E tests
- **Documentation**: Code comments, guides, and examples
- **Performance**: Optimizations and improvements
- **Accessibility**: Making the app more accessible

## 📝 Pull Request Process

### Before Submitting

1. **Test your changes**: Ensure all tests pass
2. **Check code style**: Run linting and formatting
3. **Update documentation**: Add/update relevant docs
4. **Verify functionality**: Test in different browsers/devices

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added for new functionality
- [ ] Documentation updated if needed
- [ ] No breaking changes (or clearly documented)
- [ ] Screenshots included for UI changes

### PR Description Template

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Additional Notes
Any additional information or context
```

### Review Process

1. **Automated checks**: All CI checks must pass
2. **Code review**: At least one maintainer review required
3. **Testing**: Reviewers may test functionality
4. **Feedback**: Address any requested changes
5. **Merge**: Once approved, we'll merge your PR

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

```typescript
// Use TypeScript for type safety
interface TransferData {
  amount: string;
  currency: string;
  recipient: string;
}

// Use arrow functions for consistency
const calculateFee = (amount: number): number => {
  return amount * 0.05;
};

// Use descriptive variable names
const transferAmount = parseFloat(amountInput);
const conversionRate = getExchangeRate(fromCurrency, toCurrency);
```

### React Components

```tsx
// Use functional components with hooks
const TransferForm: React.FC<TransferFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TransferData>();
  
  // Extract complex logic into custom hooks
  const { validateForm, errors } = useFormValidation(formData);
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Component JSX */}
    </form>
  );
};

// Export as default
export default TransferForm;
```

### CSS/Styling

```tsx
// Use Tailwind CSS classes
<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
  Send Transfer
</button>

// Use semantic class names for complex styling
<div className="transfer-card shadow-lg border border-gray-200 rounded-lg p-6">
  {/* Content */}
</div>
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   └── specific/        # Feature-specific components
├── hooks/               # Custom React hooks
├── services/            # API services
├── utils/               # Utility functions
└── types/               # TypeScript types
```

## 🧪 Testing Requirements

### Unit Tests

Write unit tests for:
- Utility functions
- Custom hooks
- Component logic

```typescript
// Example unit test
describe('calculateTransferFee', () => {
  it('should calculate correct fee for bank transfer', () => {
    const fee = calculateTransferFee('100', 'bank');
    expect(fee).toBe(4.99);
  });
});
```

### Integration Tests

Test component interactions:

```typescript
// Example integration test
describe('TransferForm', () => {
  it('should submit form with valid data', async () => {
    render(<TransferForm onSubmit={mockOnSubmit} />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' }
    });
    
    // Submit form
    fireEvent.click(screen.getByText('Submit'));
    
    // Assert submission
    expect(mockOnSubmit).toHaveBeenCalledWith(expectedData);
  });
});
```

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Calculates the total fee for a money transfer
 * @param amount - Transfer amount as string
 * @param deliveryMethod - Method of delivery (bank, card, wallet)
 * @returns Total fee amount
 */
export const calculateTotalFee = (amount: string, deliveryMethod: string): number => {
  // Implementation
};
```

### Component Documentation

```tsx
interface TransferFormProps {
  /** Callback function called when form is submitted */
  onSubmit: (data: TransferData) => void;
  /** Initial form data */
  initialData?: Partial<TransferData>;
  /** Whether form is in loading state */
  isLoading?: boolean;
}

/**
 * TransferForm component for creating money transfers
 * 
 * @example
 * ```tsx
 * <TransferForm 
 *   onSubmit={handleSubmit}
 *   initialData={{ amount: '100' }}
 * />
 * ```
 */
const TransferForm: React.FC<TransferFormProps> = ({ onSubmit, initialData, isLoading }) => {
  // Component implementation
};
```

### README Updates

When adding new features, update relevant documentation:

- Main README.md
- API documentation
- Component documentation
- User guides

## 🎉 Recognition

Contributors are recognized in several ways:

- **Contributors list**: Added to README.md
- **Release notes**: Mentioned in release announcements
- **Community showcase**: Featured in community channels

## 📞 Getting Help

If you need help with contributing:

1. **Check existing issues**: Search for similar questions
2. **Join our Discord**: Real-time community support
3. **Create a discussion**: For general questions
4. **Open an issue**: For specific problems

### Contact Information

- **GitHub Issues**: [Project Issues](https://github.com/your-org/remitflow/issues)
- **Discord**: [Community Server](https://discord.gg/remitflow)
- **Email**: contributors@remitflow.com

## 📄 License

By contributing to RemitFlow, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to RemitFlow! Together, we're building a better way to send money across borders. 🚀
