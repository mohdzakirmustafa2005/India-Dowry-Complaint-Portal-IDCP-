export interface CaseRecord {
  id: string;
  location: string;
  type: string;
  timestamp: number;
  status: 'Processing' | 'Routed' | 'Action Taken';
  isSimulation?: boolean;
}

class ComplaintStore {
  private listeners: Function[] = [];
  private cases: CaseRecord[] = [];
  private simulationInterval: any;

  constructor() {
    this.load();
    // Start simulation to demonstrate real-time capabilities
    this.startSimulation();
  }

  private load() {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('idcp_cases_v1');
    if (stored) {
      this.cases = JSON.parse(stored);
    } else {
      // Seed initial real-looking data
      this.cases = [
         { id: 'IDCP-99281', location: 'Karimnagar, Telangana', type: 'Cash Demand', timestamp: Date.now() - 120000, status: 'Routed', isSimulation: true },
         { id: 'IDCP-99282', location: 'Pune, Maharashtra', type: 'Domestic Violence', timestamp: Date.now() - 300000, status: 'Processing', isSimulation: true },
         { id: 'IDCP-99283', location: 'Noida, UP', type: 'Property Dispute', timestamp: Date.now() - 600000, status: 'Action Taken', isSimulation: true }
      ];
    }
  }

  private save() {
    if (typeof window === 'undefined') return;
    // Limit local storage to last 100 items to prevent overflow in demo
    const dataToSave = this.cases.slice(0, 100);
    localStorage.setItem('idcp_cases_v1', JSON.stringify(dataToSave));
    this.notify();
  }

  subscribe(callback: (data: CaseRecord[]) => void) {
    this.listeners.push(callback);
    // Immediately invoke with current data
    callback(this.cases);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.cases));
  }

  addComplaint(data: any) {
    const newCase: CaseRecord = {
      id: `IDCP-${Math.floor(100000 + Math.random() * 900000)}`,
      location: `${data.district}, ${data.state}`,
      type: data.dowryType[0] || 'Harassment',
      timestamp: Date.now(),
      status: 'Processing',
      isSimulation: false
    };
    this.cases.unshift(newCase);
    this.save();
    return newCase.id;
  }

  getStats() {
    // Base historical number + live count
    const baseCount = 248902;
    return {
      total: baseCount + this.cases.length,
      today: this.cases.filter(c => Date.now() - c.timestamp < 86400000).length,
      liveFeed: this.cases.slice(0, 50)
    };
  }
  
  private startSimulation() {
     if (this.simulationInterval) clearInterval(this.simulationInterval);
     
     // Simulate incoming traffic from other "users" in India
     this.simulationInterval = setInterval(() => {
         const cities = ['Warangal, Telangana', 'Lucknow, UP', 'Bangalore, Karnataka', 'Jaipur, Rajasthan', 'Patna, Bihar', 'Mumbai, Maharashtra', 'Chennai, TN'];
         const types = ['Verbal Abuse', 'Cash Demand', 'Property Dispute', 'Jewelry Demand', 'Blackmail'];
         const randomCity = cities[Math.floor(Math.random() * cities.length)];
         const randomType = types[Math.floor(Math.random() * types.length)];
         
         const mockCase: CaseRecord = {
            id: `IDCP-${Math.floor(100000 + Math.random() * 900000)}`,
            location: randomCity,
            type: randomType,
            timestamp: Date.now(),
            status: 'Processing',
            isSimulation: true
         };
         
         this.cases.unshift(mockCase);
         if(this.cases.length > 100) this.cases.pop(); // Keep list manageable
         this.save();
     }, 8000); // New case every 8 seconds
  }
}

export const store = new ComplaintStore();