package com.foodloss.repository;

import com.foodloss.model.ConsumptionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsumptionRecordRepository extends JpaRepository<ConsumptionRecord, Long> {
    List<ConsumptionRecord> findByFoodItemId(Long foodItemId);
}
