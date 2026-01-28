package com.foodloss.service;

import com.foodloss.model.FoodItem;
import com.foodloss.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodItemService {

    private final FoodItemRepository repository;

    public List<FoodItem> getAllFoodItems() {
        return repository.findAll();
    }

    public FoodItem saveFoodItem(FoodItem foodItem) {
        if (foodItem.getCreatedAt() == null) {
            foodItem.setCreatedAt(LocalDate.now());
        }
        return repository.save(foodItem);
    }

    public FoodItem updateFoodItem(Long id, FoodItem foodItemDetails) {
        FoodItem foodItem = repository.findById(id).orElseThrow();
        foodItem.setName(foodItemDetails.getName());
        foodItem.setQuantity(foodItemDetails.getQuantity());
        foodItem.setExpiryDate(foodItemDetails.getExpiryDate());
        return repository.save(foodItem);
    }

    public void deleteFoodItem(Long id) {
        repository.deleteById(id);
    }

    public FoodItem getFoodItemById(Long id) {
        return repository.findById(id).orElseThrow();
    }
}
