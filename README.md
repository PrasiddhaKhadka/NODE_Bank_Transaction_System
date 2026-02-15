# Bank Transaction Backend

A simple and robust bank transaction backend built with Node.js, Express, and MongoDB. This system implements double-entry bookkeeping with transaction atomicity using MongoDB sessions.

## 🏗️ Architecture Overview

The system uses a ledger-based approach to maintain account balances:
- **No direct balance storage** - balances are calculated in real-time
- **Double-entry bookkeeping** - every transaction creates two ledger entries
- **Idempotency** - prevents duplicate transactions
- **ACID compliance** - using MongoDB transactions for data consistency

## 📊 Transaction Flow

1. **Transaction Initialization**
   - Transaction created with status: `pending`
   - Idempotency key generated to prevent duplicates
   - MongoDB session started

2. **Ledger Entry Creation**
   - **Debit entry** created for sender account
   - **Credit entry** created for receiver account
   - Both entries linked to the transaction ID

3. **Balance Calculation**
   ```
   Actual Balance = Total Credits - Total Debits
   ```

4. **Transaction Completion**
   - Ledger entries verified
   - Transaction status updated to `success`
   - MongoDB session committed and closed

## 📁 Folder Structure

```
bank_backend/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── account.controller.js
│   │   ├── auth.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── models/                # Database schemas
│   │   ├── account.models.js
│   │   ├── blacklist.model.js
│   │   ├── ledger.model.js
│   │   ├── transaction.models.js
│   │   └── user.models.js
│   │
│   ├── routes/                # API endpoints
│   │   ├── account.routes.js
│   │   ├── auth.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── middlewares/           # Express middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── not_found.middleware.js
│   │
│   ├── utils/                 # Helper functions
│   │   ├── jwt.js
│   │   ├── nodemailerconfig.js
│   │   └── send_email.js
│   │
│   ├── db/                    # Database connection
│   ├── error/                 # Custom error classes
│   └── app.js                 # Express app configuration
│
├── server.js                  # Server entry point
├── package.json
├── .env
└── .gitignore
```

## 🗃️ Core Models

### Transaction Model
- `transaction_id` (unique)
- `from_account`
- `to_account`
- `amount`
- `status` (pending/success/failed)
- `idempotency_key`
- `timestamp`

### Ledger Model
- `transaction_id` (reference)
- `account_id`
- `type` (debit/credit)
- `amount`
- `balance_after`
- `timestamp`

### Account Model
- `account_id`
- `user_id`
- `account_type`
- `created_at`

### User Model
- `user_id`
- `name`
- `email`
- `password` (hashed)
- `created_at`

## 🔐 Authentication

- JWT-based authentication
- Token blacklisting for logout
- Password hashing
- Email verification support

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher for transaction support)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <git@github.com:PrasiddhaKhadka/NODE_Bank_Transaction_System.git>
cd bank_backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bank_db
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

4. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Account Management
- `GET /api/accounts` - Get all accounts for user
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:id` - Get account details
- `GET /api/accounts/:id/balance` - Get current balance

### Transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:id` - Get transaction details
- `GET /api/transactions/:id/status` - Get transaction status

## 🔒 Security Features

- **Idempotency Keys**: Prevents duplicate transactions
- **JWT Authentication**: Secure token-based authentication
- **Token Blacklisting**: Invalidates tokens on logout
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Request validation middleware
- **Error Handling**: Centralized error handling

## 💡 Key Features

### Atomic Transactions
All transaction operations are wrapped in MongoDB sessions to ensure ACID compliance:
```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Create transaction
  // Create ledger entries
  // Update balances
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### Balance Calculation
Real-time balance calculation using ledger aggregation:
```javascript
const balance = await Ledger.aggregate([
  { $match: { account_id: accountId } },
  {
    $group: {
      _id: null,
      credits: { $sum: { $cond: [{ $eq: ["$type", "credit"] }, "$amount", 0] } },
      debits: { $sum: { $cond: [{ $eq: ["$type", "debit"] }, "$amount", 0] } }
    }
  }
]);
const actualBalance = balance.credits - balance.debits;
```

### Idempotency
Prevents duplicate transactions using unique idempotency keys:
```javascript
const existingTransaction = await Transaction.findOne({
  idempotency_key: req.body.idempotency_key
});
if (existingTransaction) {
  return res.status(200).json(existingTransaction);
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Transaction States

- **pending**: Transaction created, processing in progress
- **success**: Transaction completed successfully
- **failed**: Transaction failed, rolled back

## ⚠️ Error Handling

The system includes comprehensive error handling:
- Custom error classes
- Error middleware for Express
- Detailed error messages
- HTTP status codes
- MongoDB transaction rollback on errors

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - Email username
- `EMAIL_PASS` - Email password

## 📚 Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT implementation
- `bcryptjs` - Password hashing
- `nodemailer` - Email sending
- `dotenv` - Environment variables
- `cors` - CORS middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Your Name - [prasiddhak77@gmail.com]

## 🐛 Known Issues

- None at the moment

## 🔜 Future Enhancements

- Transaction reversal/refund functionality
- Multi-currency support
- Transaction limits and daily limits
- Fraud detection
- Account statements generation
- Real-time notifications
- Transaction categories and tags

## 📞 Support

For support, email prasiddhak77@gmail.com or create an issue in the repository.
