package Rangeslider;
import javax.swing.JSlider;
import javax.swing.event.ChangeListener;

public class RangeSlider extends JSlider implements RangeSliderInterface
{
	
	public RangeSlider(int min, int max, int firstBound, int secondBound) {
		super.setMaximum(max);
		super.setMinimum(min);
		this.setFirstBound(firstBound);
		this.setSecondBound(secondBound);
	}
	
	public RangeSlider(int min, int max) {
		super.setMaximum(max);
		super.setMinimum(min);
		this.setFirstBound(min);
		this.setSecondBound(max);
	}
	
	@Override
	public int getFirstBound() {
		return getValue();
	}

	@Override
	public int getSecondBound() {
		return getMaximum()-getExtent();
	}

	@Override
	public void setFirstBound(int first) {
		super.setValue(first);
	}

	
	@Override
	public void setSecondBound(int second) {
		super.setExtent(getMaximum()-second);
	}
	
	@Override
	public void updateUI() {
		setUI(new RangeSliderUI(this));
		updateLabelUIs();
	}

}
