import { LessThan } from 'typeorm';
import { Connection, Repository } from 'typeorm';

import { Coupon } from '@models/coupon';
import { COURSE } from '@data/course-keys-types';
import { BUNDLE } from '@data/bundle-keys-types';

export class CouponConnector {
  couponRepository: Repository<Coupon>;

  constructor(connection: Connection) {
    this.couponRepository =
      connection?.getRepository<Coupon>('Coupon');
  }

  async createCoupons(
    coupon: string,
    discount: number,
    count: number,
    courseId: COURSE,
    bundleId: BUNDLE
  ) {
    await this.removeExpiredCoupons();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const couponEntity = new Coupon();

    couponEntity.coupon = coupon;
    couponEntity.discount = discount;
    couponEntity.count = count;
    couponEntity.courseId = courseId;
    couponEntity.bundleId = bundleId;
    couponEntity.expiresAt = expiresAt;

    return await this.couponRepository.save(couponEntity);
  }

  async redeemCoupon(
    coupon: string,
    price: number,
    courseId: COURSE,
    bundleId: BUNDLE
  ) {
    const couponEntity = await this.couponRepository.findOne({
      coupon,
    });

    if (!couponEntity) {
      return price;
    }

    const isNotTightToCourseOrBundle =
      (couponEntity.courseId && couponEntity.courseId !== courseId) ||
      (couponEntity.bundleId && couponEntity.bundleId !== bundleId);

    if (isNotTightToCourseOrBundle) {
      return price;
    }

    const isExpired =
      new Date().getTime() >
      new Date(couponEntity.expiresAt).getTime();

    if (isExpired) {
      return price;
    }

    const count = couponEntity.count;

    if (count === 0) {
      return price;
    }

    const discountPrice = Number(
      ((price / 100) * (100 - couponEntity.discount)).toFixed(0)
    );

    return discountPrice;
  }

  async removeCoupon(coupon: string) {
    const couponEntity = await this.couponRepository.findOne({
      coupon,
    });

    if (!couponEntity) {
      return;
    }

    if (couponEntity.count > 1) {
      couponEntity.count = couponEntity.count - 1;
      await this.couponRepository.save(couponEntity);
    } else {
      await this.couponRepository.remove(couponEntity);
    }

    return;
  }

  async removeExpiredCoupons() {
    const coupons = await this.couponRepository.find({
      where: {
        expiresAt: LessThan(new Date()),
      },
    });

    for (let i = 0; i < coupons.length; i++) {
      await this.couponRepository.remove(coupons[i]);
    }

    return;
  }
}
