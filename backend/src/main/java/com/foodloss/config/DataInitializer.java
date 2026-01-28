package com.foodloss.config;

import com.foodloss.model.*;
import com.foodloss.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FoodItemRepository foodItemRepository;
    private final DonationCenterRepository centerRepository;
    private final ConsumptionRecordRepository consumptionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Initialize User
        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build());
        }

        // Initialize Food Items
        if (foodItemRepository.count() == 0) {
            foodItemRepository.saveAll(List.of(
                    FoodItem.builder().name("Milk").quantity(50).expiryDate(LocalDate.now().plusDays(1))
                            .createdAt(LocalDate.now()).build(),
                    FoodItem.builder().name("Bread").quantity(20).expiryDate(LocalDate.now().plusDays(2))
                            .createdAt(LocalDate.now()).build(),
                    FoodItem.builder().name("Rice").quantity(500).expiryDate(LocalDate.now().plusDays(30))
                            .createdAt(LocalDate.now()).build(),
                    FoodItem.builder().name("Apples").quantity(100).expiryDate(LocalDate.now().plusDays(5))
                            .createdAt(LocalDate.now()).build()));

            // Initialize Consumption Records for Prediction
            consumptionRepository.saveAll(List.of(
                    ConsumptionRecord.builder().foodItemId(3L).quantityConsumed(10)
                            .consumptionDate(LocalDate.now().minusDays(1)).build(),
                    ConsumptionRecord.builder().foodItemId(3L).quantityConsumed(15)
                            .consumptionDate(LocalDate.now().minusDays(2)).build()));
        }

        // Initialize Donation Centers
        if (centerRepository.count() == 0) {
            centerRepository.saveAll(List.of(
                    DonationCenter.builder().name("City Food Bank").location("Downtown").contactNumber("1234567890")
                            .build(),
                    DonationCenter.builder().name("Hope Shelter").location("Uptown").contactNumber("0987654321")
                            .build()));
        }
    }
}
