// This demonstrates automatic UI updates when reservation data changes

// Base Observer interface
interface Observer {
  update: (data: any) => void;
}

// Base Subject interface
interface Subject {
  attach: (observer: Observer) => void;
  detach: (observer: Observer) => void;
  notify: (data: any) => void;
}

// Reservation data type
export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
  userId: string;
}

// Subject: Manages reservation data and notifies observers of changes
export class ReservationManager implements Subject {
  private observers: Observer[] = [];
  private reservations: Reservation[] = [];

  // Observer pattern methods
  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: { action: string; reservation?: Reservation; reservations?: Reservation[] }): void {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }

  // Business logic methods that trigger notifications
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    this.notify({ 
      action: 'added', 
      reservation,
      reservations: [...this.reservations] 
    });
  }

  updateReservation(id: string, updates: Partial<Reservation>): void {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservations[index] = { ...this.reservations[index], ...updates };
      this.notify({ 
        action: 'updated', 
        reservation: this.reservations[index],
        reservations: [...this.reservations] 
      });
    }
  }

  cancelReservation(id: string): void {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      const cancelled = { ...this.reservations[index], status: 'cancelled' as const };
      this.reservations[index] = cancelled;
      this.notify({ 
        action: 'cancelled', 
        reservation: cancelled,
        reservations: [...this.reservations] 
      });
    }
  }

  getReservations(): Reservation[] {
    return [...this.reservations];
  }

  // Load initial data (simulating API call)
  loadReservations(reservations: Reservation[]): void {
    this.reservations = [...reservations];
    this.notify({ 
      action: 'loaded', 
      reservations: [...this.reservations] 
    });
  }
}

// Observer: React component that displays the reservation list
export class ReservationListView implements Observer {
  private container: HTMLElement;
  private reservationManager: ReservationManager;

  constructor(containerId: string, reservationManager: ReservationManager) {
    this.container = document.getElementById(containerId) || document.body;
    this.reservationManager = reservationManager;
    this.reservationManager.attach(this);
    
    // Initial render
    this.render();
  }

  update(data: { action: string; reservation?: Reservation; reservations?: Reservation[] }): void {
    switch (data.action) {
      case 'added':
        this.showNotification(`New reservation added for ${data.reservation?.roomName}`);
        break;
      case 'updated':
        this.showNotification(`Reservation updated for ${data.reservation?.roomName}`);
        break;
      case 'cancelled':
        this.showNotification(`Reservation cancelled for ${data.reservation?.roomName}`);
        break;
    }
    
    // Re-render the entire list
    this.render();
  }

  private render(): void {
    const reservations = this.reservationManager.getReservations();
    
    this.container.innerHTML = `
      <div class="reservation-list">
        <h2>My Reservations (${reservations.length})</h2>
        <div id="notifications" class="notifications"></div>
        <div class="reservations">
          ${reservations.map(reservation => this.renderReservation(reservation)).join('')}
        </div>
      </div>
    `;

    // Add event listeners for actions
    this.attachEventListeners();
  }

  private renderReservation(reservation: Reservation): string {
    const statusClass = reservation.status === 'active' ? 'active' : 
                       reservation.status === 'completed' ? 'completed' : 'cancelled';
    
    return `
      <div class="reservation-item ${statusClass}" data-id="${reservation.id}">
        <div class="reservation-info">
          <h3>${reservation.roomName}</h3>
          <p>${this.formatDateTime(reservation.startTime)} - ${this.formatDateTime(reservation.endTime)}</p>
          <span class="status">${reservation.status}</span>
        </div>
        <div class="reservation-actions">
          ${reservation.status === 'active' ? 
            `<button class="cancel-btn" data-id="${reservation.id}">Cancel</button>` : 
            ''}
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    // Cancel button listeners
    this.container.querySelectorAll('.cancel-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const reservationId = target.getAttribute('data-id');
        if (reservationId) {
          this.reservationManager.cancelReservation(reservationId);
        }
      });
    });
  }

  private showNotification(message: string): void {
    const notificationsContainer = document.getElementById('notifications');
    if (notificationsContainer) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      notificationsContainer.appendChild(notification);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }

  private formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(date));
  }

  // Cleanup method to detach observer
  destroy(): void {
    this.reservationManager.detach(this);
  }
}

// Additional Observer: Statistics View
export class ReservationStatsView implements Observer {
  private container: HTMLElement;
  private reservationManager: ReservationManager;

  constructor(containerId: string, reservationManager: ReservationManager) {
    this.container = document.getElementById(containerId) || document.body;
    this.reservationManager = reservationManager;
    this.reservationManager.attach(this);
    
    this.render();
  }

  update(_data: { action: string; reservation?: Reservation; reservations?: Reservation[] }): void {
    this.render();
  }

  private render(): void {
    const reservations = this.reservationManager.getReservations();
    const stats = this.calculateStats(reservations);
    
    this.container.innerHTML = `
      <div class="reservation-stats">
        <h3>Reservation Statistics</h3>
        <div class="stat-item">
          <span class="stat-label">Total Reservations:</span>
          <span class="stat-value">${stats.total}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Active:</span>
          <span class="stat-value">${stats.active}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completed:</span>
          <span class="stat-value">${stats.completed}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Cancelled:</span>
          <span class="stat-value">${stats.cancelled}</span>
        </div>
      </div>
    `;
  }

  private calculateStats(reservations: Reservation[]) {
    return reservations.reduce((stats, reservation) => {
      stats.total++;
      stats[reservation.status]++;
      return stats;
    }, { total: 0, active: 0, completed: 0, cancelled: 0 });
  }

  destroy(): void {
    this.reservationManager.detach(this);
  }
}

// Example usage and integration function
export function initializeReservationSystem() {
  // Create the subject (data manager)
  const reservationManager = new ReservationManager();
  
  // Create observers (UI components)
  const listView = new ReservationListView('reservation-list-container', reservationManager);
  const statsView = new ReservationStatsView('stats-container', reservationManager);
  
  // Simulate loading initial data
  const initialReservations: Reservation[] = [
    {
      id: '1',
      roomId: 'room-101',
      roomName: 'Study Room 101',
      startTime: new Date('2024-01-15T10:00:00'),
      endTime: new Date('2024-01-15T12:00:00'),
      status: 'active',
      userId: 'user-123'
    },
    {
      id: '2',
      roomId: 'room-205',
      roomName: 'Quiet Study Room 205',
      startTime: new Date('2024-01-14T14:00:00'),
      endTime: new Date('2024-01-14T16:00:00'),
      status: 'completed',
      userId: 'user-123'
    }
  ];
  
  reservationManager.loadReservations(initialReservations);
  
  // Return manager for external interactions (like API calls)
  return {
    reservationManager,
    listView,
    statsView
  };
}

// Export types for use in other files
export type { Observer, Subject };
