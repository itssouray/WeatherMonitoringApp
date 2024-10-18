import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog';

const WeatherSummaryDialog = ({ isOpen, onClose, cityName, summary }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cityName} - Daily Summary</DialogTitle>
          <DialogDescription>
            Here are the daily weather summary details for {cityName}.
          </DialogDescription>
        </DialogHeader>

        <div>
          <p>Average Temperature: {summary.avgTemp} °C</p>
          <p>Max Temperature: {summary.maxTemp} °C</p>
          <p>Min Temperature: {summary.minTemp} °C</p>
          <p>Dominant Condition: {summary.dominantCondition}</p>
        </div>

        <DialogClose className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Close
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherSummaryDialog;
