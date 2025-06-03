
# Security Configuration Guide

This open-source project includes configurable security features that can be enabled or disabled based on your deployment needs.

## Security Features

### ✅ Always Enabled
- Input validation and sanitization
- Basic XSS protection
- SQL injection prevention
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

### ⚙️ Configurable Features
- Authentication system
- Rate limiting
- Audit logging
- Transfer amount limits
- CORS origins

## Configuration

Copy `.env.example` to `.env` and configure according to your needs:

```bash
# Enable/disable authentication
ENABLE_AUTH=false

# Enable rate limiting (recommended for production)
ENABLE_RATE_LIMIT=true

# Enable audit logging
ENABLE_AUDIT_LOG=true

# Set maximum transfer amount
MAX_TRANSFER_AMOUNT=10000

# Configure allowed origins
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

## Deployment Recommendations

### Development/Demo
```env
ENABLE_AUTH=false
ENABLE_RATE_LIMIT=false
ENABLE_AUDIT_LOG=true
```

### Production
```env
ENABLE_AUTH=true
ENABLE_RATE_LIMIT=true
ENABLE_AUDIT_LOG=true
MAX_TRANSFER_AMOUNT=50000
ALLOWED_ORIGINS=https://yourdomain.com
```

## Security Best Practices

1. **Never use this for real financial transactions without proper authentication**
2. **Always enable rate limiting in production**
3. **Configure specific allowed origins instead of using '*'**
4. **Set appropriate transfer limits**
5. **Monitor audit logs regularly**
6. **Use HTTPS in production**
7. **Regularly update dependencies**

## Audit Logs

When `ENABLE_AUDIT_LOG=true`, the system logs:
- Transfer creation and completion
- Validation errors
- Authentication attempts (when auth is enabled)

Logs are stored in:
- Console output (development)
- Browser localStorage (frontend demo)
- Configure external logging service for production

## Contributing Security Improvements

When contributing security-related changes:
1. Ensure backward compatibility
2. Make security features configurable
3. Document security implications
4. Test with both enabled and disabled security features
