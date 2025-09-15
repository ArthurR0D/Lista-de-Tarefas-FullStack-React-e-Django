import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

// Temas light e dark
export const lightTheme = {
  colors: {
    primary: '#4f46e5',
    primaryDark: '#3730a3',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    light: '#f8fafc',
    dark: '#1e293b',
    gray: '#64748b',
    white: '#ffffff',
    border: '#e2e8f0',
    
    // Cores específicas do tema
    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    cardBackground: '#ffffff',
    cardBorder: '#e2e8f0',
    inputBackground: '#ffffff',
    inputBorder: '#e2e8f0',
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 3px rgba(79, 70, 229, 0.1)',
  }
};

export const darkTheme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#0891b2',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    light: '#374151',
    dark: '#f9fafb',
    gray: '#9ca3af',
    white: '#111827',
    border: '#374151',
    
    // Cores específicas do tema dark
    background: '#111827',
    backgroundSecondary: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    cardBackground: '#1f2937',
    cardBorder: '#374151',
    inputBackground: '#374151',
    inputBorder: '#4b5563',
  },
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    cardHover: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
    focus: '0 0 0 3px rgba(99, 102, 241, 0.3)',
  }
};

// Container principal
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Header da aplicação
export const Header = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: ${props => props.theme.shadows.card};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
`;

// Cards
export const Card = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.cardBorder};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.cardHover};
  }
`;

// Formulários
export const Form = styled.form`
  background: ${props => props.theme.colors.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme.colors.cardBorder};
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.focus};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.focus};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.focus};
  }

  option {
    background: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.text};
  }
`;

// Botões - Usando transient props ($variant)
export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  ${props => {
    const colors = props.theme.colors;
    switch (props.$variant) {
        case 'primary':
            return `
              background: ${colors.primary};
              color: white;
              &:hover { background: ${colors.primaryDark}; }
            `;
        case 'secondary':
            return `
              background: ${colors.secondary};
              color: white;
              &:hover { background: #0891b2; }
            `;
        case 'success':
            return `
              background: ${colors.success};
              color: white;
              &:hover { background: #059669; }
            `;
        case 'warning':
            return `
              background: ${colors.warning};
              color: white;
              &:hover { background: #d97706; }
            `;
        case 'danger':
            return `
              background: ${colors.danger};
              color: white;
              &:hover { background: #dc2626; }
            `;
        case 'outline':
            return `
              background: transparent;
              color: ${colors.primary};
              border: 2px solid ${colors.primary};
              &:hover {
                background: ${colors.primary};
                color: white;
              }
            `;
        default:
            return `
              background: ${colors.gray};
              color: white;
              &:hover { background: #475569; }
            `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Layout em grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Badges/Tags - Usando transient props ($variant)
export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;

  ${props => {
    const colors = props.theme.colors;
    switch (props.$variant) {
        case 'high':
            return `
              background: ${props.theme === darkTheme ? '#7f1d1d' : '#fef2f2'};
              color: ${colors.danger};
              border: 1px solid ${colors.danger}40;
            `;
        case 'medium':
            return `
              background: ${props.theme === darkTheme ? '#78350f' : '#fffbeb'};
              color: ${colors.warning};
              border: 1px solid ${colors.warning}40;
            `;
        case 'low':
            return `
              background: ${props.theme === darkTheme ? '#14532d' : '#f0fdf4'};
              color: ${colors.success};
              border: 1px solid ${colors.success}40;
            `;
        case 'completed':
            return `
              background: ${props.theme === darkTheme ? '#14532d' : '#f0fdf4'};
              color: ${colors.success};
              border: 1px solid ${colors.success}40;
            `;
        case 'in_progress':
            return `
              background: ${props.theme === darkTheme ? '#164e63' : '#eff6ff'};
              color: ${colors.secondary};
              border: 1px solid ${colors.secondary}40;
            `;
        case 'pending':
            return `
              background: ${props.theme.colors.backgroundSecondary};
              color: ${colors.textSecondary};
              border: 1px solid ${colors.border};
            `;
        case 'primary':
            return `
              background: ${props.theme === darkTheme ? '#312e81' : '#ede9fe'};
              color: ${colors.primary};
              border: 1px solid ${colors.primary}40;
            `;
        case 'secondary':
            return `
              background: ${props.theme === darkTheme ? '#164e63' : '#f0f9ff'};
              color: ${colors.secondary};
              border: 1px solid ${colors.secondary}40;
            `;
        case 'danger':
            return `
              background: ${props.theme === darkTheme ? '#7f1d1d' : '#fef2f2'};
              color: ${colors.danger};
              border: 1px solid ${colors.danger}40;
            `;
        default:
            return `
              background: ${props.theme.colors.backgroundSecondary};
              color: ${colors.textSecondary};
              border: 1px solid ${colors.border};
            `;
    }
  }}
`;

// Loader/Spinner
export const Spinner = styled.div`
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Layout flexível - Usando transient props ($align, $justify, $gap, $wrap)
export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap || '1rem'};
  flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
`;

// Texto
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

// Seção de estatísticas
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled(Card)`
  text-align: center;
  padding: 1rem;
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

// Theme Provider Component
export function StyledComponentsThemeProvider({ children, theme }) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}