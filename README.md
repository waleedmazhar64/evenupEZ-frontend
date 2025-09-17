# 💸 evenupEZ – Frontend (Angular)

**evenupEZ Frontend** is the Angular-based UI for the evenupEZ platform.  
It provides an intuitive, modern interface for users to **create groups, add shared expenses, view balances, and settle payments** — just like Splitwise, but simple and customizable.  


## ✨ Features

🎨 **Modern UI** – Built with Angular & responsive design  
👥 **Group Management** – Create, join, and manage groups visually  
➕ **Add Expenses** – Split equally or by custom shares  
📊 **Balance Overview** – Clear summary of who owes whom  
📩 **Invitations** – Invite friends to groups easily  
🔑 **Secure Auth** – Integrated with Laravel backend API  
⚡ **Real-Time Updates** – Seamless experience with async API calls  


## 🛠 Tech Stack

| Component        | Technology |
|-----------------|-----------|
| **Frontend**    | [Angular 17+](https://angular.dev) |
| **UI Library**  | Bootstrap / Tailwind (if used) |
| **State Mgmt**  | RxJS + Angular Services |
| **Backend API** | evenupEZ Laravel REST API |
| **Deployment**  | Compatible with Nginx / Apache |


## ⚙️ Installation & Setup

### Clone the repo
    
    git clone https://github.com/your-username/evenupEZ-frontend.git
    cd evenupEZ-frontend


### Install dependencies
    
    npm install


### Configure API URL

Update src/environments/environment.ts with your backend API URL:

    export const environment = {
      production: false,
      apiUrl: 'http://127.0.0.1:8000/api'
    };


### Run the app

    ng serve


App will run at http://localhost:4200



