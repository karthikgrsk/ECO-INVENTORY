package com.foodloss.controller;

import com.foodloss.model.FoodItem;
import com.foodloss.service.FoodItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food-items")
@RequiredArgsConstructor
public class FoodItemController {

    private final FoodItemService service;

    @GetMapping
    public List<FoodItem> getAll() {
        return service.getAllFoodItems();
    }

    @PostMapping
    public FoodItem create(@RequestBody FoodItem foodItem) {
        return service.saveFoodItem(foodItem);
    }

    @PutMapping("/{id}")
    public FoodItem update(@PathVariable Long id, @RequestBody FoodItem foodItem) {
        return service.updateFoodItem(id, foodItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
}
