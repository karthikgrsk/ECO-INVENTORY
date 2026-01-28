package com.foodloss.service;

import com.foodloss.dto.AIAlert;
import com.foodloss.model.ConsumptionRecord;
import com.foodloss.model.FoodItem;
import com.foodloss.repository.ConsumptionRecordRepository;
import com.foodloss.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIService {

    private final FoodItemRepository foodItemRepository;
    private final ConsumptionRecordRepository consumptionRecordRepository;

    public List<AIAlert> getExpiryAlerts() {
        List<FoodItem> items = foodItemRepository.findAll();
        List<AIAlert> alerts = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (FoodItem item : items) {
            long daysToExpiry = ChronoUnit.DAYS.between(today, item.getExpiryDate());
            if (daysToExpiry <= 2 && daysToExpiry >= 0) {
                alerts.add(AIAlert.builder()
                        .foodItemId(item.getId())
                        .foodName(item.getName())
                        .alertType("High Spoilage Risk")
                        .insight(item.getName() + " is expiring in " + daysToExpiry
                                + " days. Immediate consumption or donation recommended.")
                        .currentQuantity(item.getQuantity())
                        .build());
            }
        }
        return alerts;
    }

    public List<AIAlert> getSurplusAlerts() {
        List<FoodItem> items = foodItemRepository.findAll();
        List<AIAlert> alerts = new ArrayList<>();

        for (FoodItem item : items) {
            int predictedDemand = calculateDemand(item.getId(), 3);
            if (item.getQuantity() > predictedDemand) {
                int surplus = item.getQuantity() - predictedDemand;
                alerts.add(AIAlert.builder()
                        .foodItemId(item.getId())
                        .foodName(item.getName())
                        .alertType("Surplus Detected")
                        .insight("Current stock of " + item.getName() + " exceeds predicted demand by " + surplus
                                + " units. Consider donating.")
                        .currentQuantity(item.getQuantity())
                        .predictedDemand(predictedDemand)
                        .build());
            }
        }
        return alerts;
    }

    public int calculateDemand(Long foodItemId, int days) {
        List<ConsumptionRecord> records = consumptionRecordRepository.findByFoodItemId(foodItemId);
        if (records.isEmpty())
            return 10; // Default fallback demand

        double averageDaily = records.stream()
                .mapToInt(ConsumptionRecord::getQuantityConsumed)
                .average()
                .orElse(0.0);

        return (int) Math.ceil(averageDaily * days);
    }
}
