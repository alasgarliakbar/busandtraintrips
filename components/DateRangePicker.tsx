import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

// Get current month and year
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Helper to get days in month
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper to get day of week (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Format date to string (YYYY-MM-DD)
const formatDate = (day, month, year) => {
  const formattedMonth = String(month + 1).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  return `${formattedMonth}/${formattedDay}/${year}`;
};

interface DateRangePickerProps {
  onSelectDates: (range: { startDate: string | null; endDate: string | null }) => void;
  initialRange?: { startDate: string | null; endDate: string | null };
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectDates, initialRange }) => {
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [viewYear, setViewYear] = useState(currentYear);
  const [startDate, setStartDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [endDate, setEndDate] = useState<{ day: number; month: number; year: number } | null>(null);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = { day, month: viewMonth, year: viewYear };
    
    if (!startDate || (endDate && isDateBefore(endDate, startDate))) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (isDateBefore(selectedDate, startDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else {
      setEndDate(selectedDate);
      
      // Trigger the callback with formatted dates
      const formattedStartDate = formatDate(startDate.day, startDate.month, startDate.year);
      const formattedEndDate = formatDate(selectedDate.day, selectedDate.month, selectedDate.year);
      
      onSelectDates({
        startDate: formattedStartDate,
        endDate: formattedEndDate
      });
    }
  };

  const isDateBefore = (date1, date2) => {
    if (date1.year < date2.year) return true;
    if (date1.year > date2.year) return false;
    if (date1.month < date2.month) return true;
    if (date1.month > date2.month) return false;
    return date1.day < date2.day;
  };

  const isDateSelected = (day: number): boolean => {
    if (!startDate) return false;
    
    const isStart = startDate && 
      startDate.day === day && 
      startDate.month === viewMonth && 
      startDate.year === viewYear;
      
    const isEnd = endDate && 
      endDate.day === day && 
      endDate.month === viewMonth && 
      endDate.year === viewYear;
      
    return isStart || isEnd;
  };

  const isDateInRange = (day: number): boolean => {
    if (!startDate || !endDate) return false;
    
    const currentDate = { day, month: viewMonth, year: viewYear };
    
    return !isDateBefore(currentDate, startDate) && 
           !isDateBefore(endDate, currentDate) && 
           !isDateSelected(day);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDayOfMonth = getFirstDayOfMonth(viewMonth, viewYear);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isInRange = isDateInRange(day);
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isInRange && styles.rangeDay,
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isInRange && styles.rangeDayText,
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
          <ChevronLeft size={20} color="#3366CC" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
          <ChevronRight size={20} color="#3366CC" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekdaysContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.calendarContainer}>
        {renderCalendar()}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {startDate 
            ? `From: ${formatDate(startDate.day, startDate.month, startDate.year)}` 
            : 'Select start date'}
        </Text>
        <Text style={styles.footerText}>
          {endDate 
            ? `To: ${formatDate(endDate.day, endDate.month, endDate.year)}` 
            : startDate ? 'Select end date' : ''}
        </Text>
      </View>
      
      {startDate && endDate && (
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => {
            const formattedStartDate = formatDate(startDate.day, startDate.month, startDate.year);
            const formattedEndDate = formatDate(endDate.day, endDate.month, endDate.year);
            onSelectDates({
              startDate: formattedStartDate,
              endDate: formattedEndDate
            });
          }}
        >
          <Text style={styles.applyButtonText}>Apply Range</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 4,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    color: '#64748B',
    fontSize: 12,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#1E293B',
  },
  selectedDay: {
    backgroundColor: '#3366CC',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rangeDay: {
    backgroundColor: 'rgba(51, 102, 204, 0.1)',
  },
  rangeDayText: {
    color: '#3366CC',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#3366CC',
    marginBottom: 4,
  },
  applyButton: {
    backgroundColor: '#3366CC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DateRangePicker;